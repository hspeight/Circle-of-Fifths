/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

//const MYUSERID = 'amzn1.ask.account.AEDWVBMTVDH4HMGTUUB2TOY7ZHSVCE3PAGUAIPSSBLCFD3G2F7PY6ZBKWX4MBNWNCVIFYES711EXNTLDPAJMFMEWDCPT5PHJJRC5RWYANCTXW7QRACAV5CF5ZR6IDDYB7ENOBKYSRURAH6FO6NTHEKND55BK3BV6LLQ7FU7Y2DJW6XEECHUPDUKRTH4RXURBCJ53YNYMPVLJV2YJA';

const Alexa = require('ask-sdk-core');

const constants = require('./constants');
var _ = require('lodash');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const ISPHelp = require('./helpers/ISPHelper');
const drillSetup = require('./drillSetup/drillSetup');
const data = require('./apl/data/main.json');
const template = require('./apl/templates/main.json');
const tempNoMatch = require('./apl/templates/no_match.json');
const dataNoMatch = require('./apl/data/no_match.json');
const dataNextQuestion = require('./apl/data/next_question.json');
const tempNextQuestion = require('./apl/templates/next_question.json');

// This is required for bespoken proxy to work
var AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});

//http://whatdidilearn.info/2018/09/16/how-to-keep-state-between-sessions-in-alexa-skill.html
const {
    DynamoDbPersistenceAdapter
} = require('ask-sdk-dynamodb-persistence-adapter');
const tableName = 'COF-USERS';
const partitionKeyName = 'COF-USERID';
const persistenceAdapter = new DynamoDbPersistenceAdapter({
    tableName,
    partitionKeyName,
    createTable: false
});

const freePackRef = constants.freePackRef;
const states = constants.states;
const languageStrings = constants.languageStrings;
const drills = constants.drills;
var drillLevels = 0;

var QUESTIONS = [];
var ANSWERS = [];

//var speech = new Object(); // object to hold speechoutput and repromptoutput strings

var lastQuestionAsked = '';
var speechOutput = '';

/* INTENT HANDLERS */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        console.log('Inside LaunchRequestHandler ++++++++++++++++ + handlerInput.requestEnvelope.request.type=' + handlerInput.requestEnvelope.request.type);
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        console.log('Handling LaunchRequest');
        return setupLevel(handlerInput);
    },
};

const AnswerHandler = {
    canHandle(handlerInput) {

        const request = handlerInput.requestEnvelope.request;

        if (request.intent) { // the intent.type property does not always exist?
            return (request.type === 'IntentRequest' &&
                request.intent.name === 'AnswerIntent' || request.intent.name === 'AnswerIntentNumeric');
        } else {
            return false;
        }

    },
    handle(handlerInput) {
        console.log("Handling Answer Handler");
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        // set up str based on the type of answer expected
        if (handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent') {
            var str = handlerInput.requestEnvelope.request.intent.slots.ANSWER.value.toUpperCase().replace(/[^A-Z ]/g, ''); // Remove anything that's not a alpha or space
        } else {
            var str = handlerInput.requestEnvelope.request.intent.slots.HOWMANY.value;
        }


        let enharmonic = ANSWERS[attributes.questionNum - 1].toString().split('/');
        if (enharmonic.includes(str)) { // does the given answer match the actual answer?
            attributes.levelScore += 1;
            speechOutput = requestAttributes.t('CORRECT_ANSWER');
        } else {
            speechOutput = '<audio src="https://s3-eu-west-1.amazonaws.com/circle-of-fifths/wrong-answer.mp3"/>';
        }
        //speechOutput = CheckAnswer(handlerInput, str) + nextQuestion;
        let nextQuestion = getNextQuestion(handlerInput);
        speechOutput += nextQuestion;
        repromptOutput = nextQuestion;
        console.log('>' + speechOutput);
        console.log('>' + nextQuestion);

        if (supportsAPL(handlerInput)) {
            dataNextQuestion.bodyTemplate7Data.text.drill = attributes.drillName;
            dataNextQuestion.bodyTemplate7Data.text.level = requestAttributes.t('LEVEL_TXT', attributes.currentLevel, attributes.drillLevels, attributes.questionNum);
            dataNextQuestion.bodyTemplate7Data.text.question = attributes.currentQTA;
            dataNextQuestion.bodyTemplate7Data.text.score = attributes.levelScore + '/' + QUESTIONS.length;
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(repromptOutput)
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    document: tempNextQuestion,
                    datasources: dataNextQuestion
                })
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(requestAttributes.t('HELP_MESSAGE_SHORT'))
                .getResponse();
        }

    },
};

function CheckAnswer(handlerInput, answerIn) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    console.log(ANSWERS);
    console.log(attributes.questionNum);


}

const NoIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (attributes.skillState === states.RESTART) {
            speechOutput = requestAttributes.t('RESTART_TEST_FALSE') + '. ' + lastQuestionAsked;
            attributes.skillState = states.QUIZ;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(lastQuestionAsked)
                .getResponse();
        } else {
            attributes.skillState = states.EXITSKILL;
            //handlerInput.attributesManager.setSessionAttributes(attributes);
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> WHO IS FIRST <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<)');
            return exitSkill(handlerInput);
        }

    },
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        console.log('inside yesintent handler');
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.YesIntent';
    },
    async handle(handlerInput) {
        console.log('handling yesintent');
        const response = handlerInput.responseBuilder;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        switch (attributes.skillState) {
            case states.QUIZ:
                return askAQuestion(handlerInput);
            case states.ENDOFLEVEL:
                return setupLevel(handlerInput);
            default:
                speechOutput = "Sorry i don't understand that! " + attributes.currentQTA;
                break;
        }

    },
};

function getNextQuestion(handlerInput) {

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    let superlative = 'super. ';
    if (attributes.questionNum < QUESTIONS.length) {
        attributes.questionNum++;
        var retval = `Question ${attributes.questionNum}. ${QUESTIONS[attributes.questionNum -1]}`; // convert to requestattribute;
    } else {
        if (attributes.currentLevel === attributes.drillLevels) { // Have all rounds in this drill been completed?
            attributes.nextProdRef = getNextPurchasableProduct(handlerInput);
            retval = requestAttributes.t('END_OF_DRILL', attributes.drillName, attributes.nextProdRef);
        } else {
            attributes.skillState = states.ENDOFLEVEL;
            let idx = getRefIndex(attributes.drillStatus, attributes.currentDrillRef);
            attributes.drillStatus[idx].level += 1;
            retval = requestAttributes.t('END_LEVEL_MESSAGE_1', attributes.drillName, attributes.currentLevel,
                attributes.levelScore, QUESTIONS.length) + superlative + requestAttributes.t('ASK_PLAY_NEXT_LEVEL');
        }
    }

    return retval;
}


function askAQuestion(handlerInput) {

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    if (attributes.questionNum < QUESTIONS.length) {
        attributes.questionNum++;
        speechOutput = `Question ${attributes.questionNum}. ${QUESTIONS[attributes.questionNum -1]}`; // convert to requestattribute;
    } else {
        speechOutput = "no more questions"; // convert
    }
    repromptOutput = speechOutput;

    if (supportsAPL(handlerInput)) {
        dataNextQuestion.bodyTemplate7Data.text.drill = attributes.drillName;
        dataNextQuestion.bodyTemplate7Data.text.level = requestAttributes.t('LEVEL_TXT', attributes.currentLevel, attributes.drillLevels, attributes.questionNum);
        dataNextQuestion.bodyTemplate7Data.text.question = attributes.currentQTA;
        dataNextQuestion.bodyTemplate7Data.text.score = attributes.levelScore + '/' + QUESTIONS.length;
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: tempNextQuestion,
                datasources: dataNextQuestion
            })
            .getResponse();
    } else {
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(requestAttributes.t('HELP_MESSAGE_SHORT'))
            .getResponse();
    }

}

function setupLevel(handlerInput) {
    //  PERFORM THE SETUP RELATIVE TO THE CURRENT DRILL.   //
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    //attributes.currentDrillRef must be set before entering this function
    //use drillref to look up drillstatus entry. if none exists add it.
    let idx = getRefIndex(attributes.drillStatus, attributes.currentDrillRef);
    if (idx === undefined) {
        let obj = {};
        obj.drill = attributes.currentDrillRef;
        obj.level = 1;
        obj.completed = false;
        attributes.drillStatus.push(JSON.parse(JSON.stringify(obj)));
        attributes.currentLevel = 1;
    } else {
        attributes.currentLevel = attributes.drillStatus[idx].level; // get the current level as recorded in drillstatus
    }
    attributes.drillName = getDrillName(attributes.currentDrillRef);
    attributes.drillLevels = getNumDrillLevels(attributes.currentDrillRef);
    attributes.levelData = getLevelData(attributes.currentDrillRef, attributes.currentLevel - 1);
    //console.log('------------' + attributes.currentLevel);
    //console.log(attributes.levelData);
    attributes.levelScore = 0;
    attributes.skillState = states.QUIZ;
    attributes.questionNum = 0;

    let userId = handlerInput.requestEnvelope.context.System.user.userId;
    const QANDA = drillSetup.setupDrill(attributes, userId);
    QUESTIONS = QANDA.QUESTIONS;
    ANSWERS = QANDA.ANSWERS;

    let intro = '<audio src="soundbank://soundlibrary/gameshow/gameshow_02"/>';
    if (attributes.launchCount === 1) {
        intro += requestAttributes.t('FIRST_TIME', attributes.drillName, attributes.drillLevels); // e.g. perfect intervals, 12 levels;
    } else {
        intro += requestAttributes.t('WELCOME_BACK', attributes.drillName, attributes.currentLevel) + requestAttributes.t('ASK_IF_READY');
    }

    speechOutput = intro;
    repromptOutput = requestAttributes.t('ASK_IF_READY');
    //if (handlerInput.requestEnvelope.session.new === true) {
    if (supportsAPL(handlerInput)) {
        data.bodyTemplate7Data.video.type = 'intro';
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                version: '1.1',
                document: template,
                datasources: data
            })
            .getResponse();
    }

}

function marksOutOfTen(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();


}

const HelpHandler = {
    canHandle(handlerInput) {
        console.log('Inside HelpHandler');
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        console.log('Inside HelpHandler - handle');
        //const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();


        speechOutput = requestAttributes.t('HELP_MESSAGE_LONG', ISPHelp.getSpeakableListOfDrills(drills), 'name of current drill');
        repromptOutput = requestAttributes.t('HELP_MESSAGE_SHORT');
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(requestAttributes.t('HELP_MESSAGE_SHORT'))
            .getResponse();
    },
};

const ExitHandler = {
    canHandle(handlerInput) {
        console.log('Inside ExitHandler');
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && (
            request.intent.name === 'AMAZON.StopIntent' ||
            request.intent.name === 'AMAZON.PauseIntent' ||
            request.intent.name === 'AMAZON.CancelIntent'
        );
    },
    async handle(handlerInput) {
        console.log('Handling Exit');

        const attributes = handlerInput.attributesManager.getSessionAttributes();

        return exitSkill(handlerInput);
    },
};

function exitSkill(handlerInput) {
    const response = handlerInput.responseBuilder;
    //const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    speechOutput = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01"/>' + '<break time="1s"/>' + requestAttributes.t('BYE_YALL');
    response.withShouldEndSession(true);

    // Display rotating circle for devices with displays
    data.bodyTemplate7Data.video.type = 'outro'; // not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // if supports screen
    return handlerInput.responseBuilder
        .speak(speechOutput)
        //.reprompt(reprompt)
        .addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            document: template,
            datasources: data
        })
        .getResponse();

}

function makeUpsell(preUpsellMessage, purchasableProduct, handlerInput) {
    //console.log('MAKING UPSELL WITH');

    //upsell packs in this order
    //key-signatures, relative keys
    //if user owns all packs tell them there is nothing left to purchase and select a random drill for them



}

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        console.log('Inside SessionEndedRequestHandler');
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        console.log("Inside ErrorHandler");
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        console.log(error);
        return handlerInput.responseBuilder
            .speak(requestAttributes.t('ERROR_1'))
            .reprompt(requestAttributes.t('ERROR_2'))
            .getResponse();
    },
};

const FallbackHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        //console.log('Inside FallbackHandler and intent is ' + request.intent.name);
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        console.log('Handling FallbackHandler');
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        console.log('FallbackHandler attributes.skillState=' + attributes.skillState);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();


    },

};

//Respond to the utterance "what have I bought"
const PurchaseHistoryHandler = {
    canHandle(handlerInput) {
        return (
            handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'PurchaseHistoryIntent'
        );
    },
    async handle(handlerInput) {

        const locale = handlerInput.requestEnvelope.request.locale;
        const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        console.log(attributes.entitledProducts);
        console.log(attributes.entitledProducts.length);
        console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOO');

        if (attributes.entitledProducts.length > 0) { // please convert to requestattributes
            speechOutput = requestAttributes.t('PACKS_PURCHASED', ISPHelp.getSpeakableListOfProducts(attributes.entitledProducts)) +
                requestAttributes.t('WHAT_TO_DO_NEXT');
            repromptOutput = speechOutput;
        } else {
            // User hasn't purchased anything so can only play free content
            speechOutput = requestAttributes.t('NO_PRODUCTS_OWNED') + requestAttributes.t('WHAT_CAN_I_BUY');
            repromptOutput = requestAttributes.t('WHAT_CAN_I_BUY');
        }

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

//Respond to the utterance "what can I buy"
const WhatCanIBuyHandler = {
    canHandle(handlerInput) {
        console.log('Inside WhatCanIBuyHandler');
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'WhatCanIBuyIntent');
    },
    handle(handlerInput) {
        console.log('Handling WhatCanIBuyHandler');
        //Get the list of products available for in-skill purchase
        //const locale = handlerInput.requestEnvelope.request.locale;
        //const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        if (attributes.purchasableProducts.length > 0) { // please convert to requestattributes
            //One or more products are available for purchase. say the list of products
            // move to i18n
            speechOutput = `Products available for purchase at this time are, ${ISPHelp.getSpeakableListOfProducts(attributes.purchasableProducts)}. 
                            To learn more about a product, say, 'Tell me more about', followed by the product name. 
                            If you are ready to buy, say 'Buy', followed by the product name.`;
            //+ 'say repeat to hear this message again.'
            repromptOutput = 'I didn\'t catch that. What can I help you with?';
        } else {
            // no products are available for purchase. Ask if they would like to hear another greeting
            speechOutput = 'There are no products to offer to you right now. Sorry about that. Would you like to play one of your purchased packs?';
            // if user says yes to above give them a random purchased drill
            repromptOutput = 'I didn\'t catch that. What can I help you with?';
        }

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

const IWantToPlayHandler = {
    canHandle(handlerInput) {
        console.log('Inside IWantToPlayHandler');
        return (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'IWantToPlayIntent');
    },
    handle(handlerInput) {
        console.log('Handling IWantToPlayHandler');
        const locale = handlerInput.requestEnvelope.request.locale;
        const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const attributes = handlerInput.attributesManager.getSessionAttributes();

    }
};

const BuyPackIntentHandler = {
    canHandle(handlerInput) {
        console.log('inside BuyPackIntentHandler');

        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'BuyPackIntent';
    },
    handle(handlerInput) {
        console.log('handling BuyPackIntentHandler');
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();


    }
};

const RefundPackIntentHandler = {
    canHandle(handlerInput) {
        console.log('inside RefundPackIntentHandler');

        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'RefundPackIntent';
    },
    handle(handlerInput) {
        console.log('handling RefundPackIntentHandler');
        // Inform the user about what products are available for purchase
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();


    }
};

const BuyAndUpsellResponseHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
            (handlerInput.requestEnvelope.request.name === 'Buy' ||
                handlerInput.requestEnvelope.request.name === 'Upsell');
    },
    handle(handlerInput) {
        console.log('IN: BuyResponseHandler.handle');
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    },
};

const CancelProductResponseHandler = {
    canHandle(handlerInput) {
        return (
            handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
            handlerInput.requestEnvelope.request.name === 'Cancel'
        );
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const productId = handlerInput.requestEnvelope.request.payload.productId;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    },
};

const TellMeMoreAboutPackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'TellMeMoreAboutPackIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();

    },
};

/* HELPER FUNCTIONS */

// Does the device support APL?
function supportsAPL(handlerInput) {
    const supportedInterfaces = handlerInput.requestEnvelope.context
        .System.device.supportedInterfaces;
    const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
    return aplInterface != null && aplInterface !== undefined;
}

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            fallbackLng: 'en', // fallback to EN if locale doesn't exist
            resources: languageStrings
        });

        localizationClient.localize = function () {
            const args = arguments;
            let values = [];

            for (var i = 1; i < args.length; i++) {
                values.push(args[i]);
            }
            const value = i18n.t(args[0], {
                returnObjects: true,
                postProcess: 'sprintf',
                sprintf: values
            });

            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            } else {
                return value;
            }
        }

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) { // pass on arguments to the localizationClient
            return localizationClient.localize(...args);
        };
    },
};

// https://developer.amazon.com/blogs/alexa/post/75ee61df-8365-44bb-b28f-e708000891ad/how-to-use-interceptors-to-simplify-handler-code-and-cache-product-and-purchase-information-in-monetized-alexa-skills
const loadISPDataInterceptor = {
    async process(handlerInput) {
        if (handlerInput.requestEnvelope.session.new === true) {
            // new session, check to see what products are already owned.
            try {
                const locale = handlerInput.requestEnvelope.request.locale;
                const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
                const result = await ms.getInSkillProducts(locale);
                const entitledProducts = ISPHelp.getAllEntitledProducts(result.inSkillProducts);
                const purchasableProducts = ISPHelp.getAllpurchasableProducts(result.inSkillProducts);
                console.log(purchasableProducts);
                const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
                sessionAttributes.entitledProducts = entitledProducts;
                sessionAttributes.purchasableProducts = purchasableProducts;
                handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
            } catch (error) {
                console.log(`Error calling InSkillProducts API: ${error}`);
            }
        }
    },
};

// This request interceptor with each new session loads all global persistent attributes
// into the session attributes and increments a launch counter
const PersistenceRequestInterceptor = {
    process(handlerInput) {
        if (handlerInput.requestEnvelope.session.new === true) {
            return new Promise((resolve, reject) => {
                handlerInput.attributesManager.getPersistentAttributes()
                    .then((persistentAttributes) => {
                        persistentAttributes = persistentAttributes || {};
                        if (!persistentAttributes.launchCount) { // first ever launch
                            persistentAttributes.drillStatus = []; //initialize array
                            persistentAttributes.currentDrillRef = freePackRef; // all new users start with the free perfect intervals drill
                            persistentAttributes.launchCount = 0;
                            persistentAttributes.very1st = true;
                        }
                        persistentAttributes.launchCount += 1;
                        handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        } // end session['new']
    }
};

// This response interceptor stores all session attributes into global persistent attributes
// when the session ends and it stores the skill last used timestamp
const PersistenceResponseInterceptor = {
    process(handlerInput, response) {

        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const r = handlerInput.requestEnvelope.request;

        if ((r.type === 'SessionEndedRequest') ||
            (r.type === 'IntentRequest' && r.intent.name === "AMAZON.StopIntent") || // skill was stopped or timed out
            sessionAttributes.skillState === states.EXITSKILL ||
            sessionAttributes.very1st === true) {

            sessionAttributes.very1st = false;
            sessionAttributes.lastUseTimestamp = new Date(handlerInput.requestEnvelope.request.timestamp).getTime();
            console.log('SET ######################################' + sessionAttributes.launchCount);
            //handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);
            return new Promise((resolve, reject) => {
                handlerInput.attributesManager.savePersistentAttributes()
                    .then(() => {
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }
};

function getNextPurchasableProduct(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    if (attributes.purchasableProducts.length > 0) {
        return attributes.purchasableProducts[0].referenceName;
    } else {
        return undefined;
    }

}

function getDrillName(drillref) {

    // use the drill ref to get the drill name
    let arr = Object.keys(drills);
    let DRILLREF = arr[arr.indexOf(drillref)]; //e.g. key-signatures
    return drills[DRILLREF].name;

}

function getNumDrillLevels(drillref) {

    // use the drill ref to get the number of levels
    let arr = Object.keys(drills);
    let DRILLREF = arr[arr.indexOf(drillref)]; //e.g. key-signatures
    return drills[DRILLREF].levels.length;
}

function getLevelData(drillref, level) {

    // use the drill ref to get the data for the current level
    let arr = Object.keys(drills);
    let DRILLREF = arr[arr.indexOf(drillref)]; //e.g. key-signatures
    console.log('LLLLLLLLLLLLLLLLLL');
    console.log(drills);
    console.log(level);
    console.log(drills[DRILLREF].levels);
    console.log(drills[DRILLREF].levels[level]);
    return drills[DRILLREF].levels[level];

}

function getRefIndex(drillstatus, drillref) {
    // get the index of the drill in drillstatus
    for (var key in drillstatus) {
        var value = drillstatus[key];
        if (value.drill === drillref)
            // console.log(key + " = " + JSON.stringify(value));
            return key;
    }
}


// ********************* LOG INTERCEPTORS ********************
const LogRequestInterceptor = {
    process(handlerInput) {
        console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
    },
};
const LogResponseInterceptor = {
    process(handlerInput) {
        console.log("=============================== START LOG REQUEST =======================================");
        console.log(JSON.stringify(handlerInput.requestEnvelope, null, 2));
        console.log("=============================== end LOG REQUEST =======================================");
    },
};
// ********************* END OF LOG INTERCEPTORS ********************

var skillBuilder = Alexa.SkillBuilders.custom();

/* LAMBDA SETUP */
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        BuyPackIntentHandler,
        IWantToPlayHandler,
        YesIntentHandler,
        NoIntentHandler,
        PurchaseHistoryHandler,
        WhatCanIBuyHandler,
        BuyAndUpsellResponseHandler,
        CancelProductResponseHandler,
        TellMeMoreAboutPackIntentHandler,
        RefundPackIntentHandler,
        AnswerHandler,
        //AnswerHandlerNumeric,
        HelpHandler,
        ExitHandler,
        //WhatIsTheAnswerHandler,
        FallbackHandler,
        SessionEndedRequestHandler
    )
    .withPersistenceAdapter(persistenceAdapter) // <-- dynamodb
    .addRequestInterceptors(PersistenceRequestInterceptor)
    .addResponseInterceptors(PersistenceResponseInterceptor)
    .addRequestInterceptors(LocalizationInterceptor)
    .addRequestInterceptors(loadISPDataInterceptor)
    //.addRequestInterceptors(LogRequestInterceptor)
    //.addResponseInterceptors(LogResponseInterceptor)
    .addErrorHandlers(ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient()) // required for getMonetizationServiceClient
    .lambda();