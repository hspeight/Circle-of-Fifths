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
//const tempNoMatch = require('./apl/templates/no_match.json');
//const dataNoMatch = require('./apl/data/no_match.json');
const dataNextQuestion = require('./apl/data/next_question.json');
const tempNextQuestion = require('./apl/templates/next_question.json');
const tempUnknownProduct = require('./apl/templates/unknownProduct.json');
const dataUnknownProduct = require('./apl/data/unknownProduct.json');
const tempPurchaseHistory = require('./apl/templates/purchaseHistory.json');
const dataPurchaseHistory = require('./apl/data/purchaseHistory.json');

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
const freePackName = constants.freePackName;

const states = constants.states;
const languageStrings = constants.languageStrings;
const drills = constants.drills;
var drillLevels = 0;

var QUESTIONS = [];
var ANSWERS = [];

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
        attributes.skillState = states.QUIZ;

        // set up str based on the type of answer expected
        if (handlerInput.requestEnvelope.request.intent.name === 'AnswerIntent') {
            var str = handlerInput.requestEnvelope.request.intent.slots.ANSWER.value.toUpperCase().replace(/[^A-Z ]/g, ''); // Remove anything that's not a alpha or space
        } else {
            var str = handlerInput.requestEnvelope.request.intent.slots.HOWMANY.value;
            console.log(str);
        }
        console.log(ANSWERS);
        if (attributes.questionNum === 0) { // going to have problems if questionnum is zero so we're out
            return handlerInput.responseBuilder
                .speak(requestAttributes.t('NO_COMPRENDE') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT'))
                .reprompt(requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT'))
                .getResponse();
        }
        let enharmonic = ANSWERS[attributes.questionNum - 1].toString().split('/');
        if (enharmonic.includes(str)) { // does the given answer match the actual answer?
            attributes.levelScore += 1;
            speechOutput = requestAttributes.t('CORRECT_ANSWER');
        } else {
            speechOutput = '<audio src="https://s3-eu-west-1.amazonaws.com/circle-of-fifths/wrong-answer.mp3"/>';
        }

        let nextQuestion = getNextQuestion(handlerInput);
        speechOutput += nextQuestion;
        repromptOutput = nextQuestion;

        if (supportsAPL(handlerInput)) {
            dataNextQuestion.bodyTemplate7Data.text.drill = attributes.drillName;
            dataNextQuestion.bodyTemplate7Data.text.level = requestAttributes.t('LEVEL_TXT', attributes.currentLevel, attributes.drillLevels, attributes.questionNum);
            switch (attributes.skillState) {
                case states.ENDOFLEVEL:
                case states.REPLAYLEVEL:
                    dataNextQuestion.bodyTemplate7Data.text.question = requestAttributes.t('ASP_END_OF_LEVEL');
                case states.ENDOFDRILLWITHUPSELL:
                    dataNextQuestion.bodyTemplate7Data.text.question = requestAttributes.t('ASP_END_OF_DRILL', attributes.drillName);
                default:
                    QUESTIONS[attributes.questionNum - 1];
                    break;
            }

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

const NoIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        switch (attributes.skillState) {
            case states.PACKDONE:
                speechOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY');
                repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                break;
            case states.QUIZ:
            case states.REPLAYLEVEL:
            case states.ENDOFLEVEL:
                speechOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY');
                repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                break;
            case states.ENDOFDRILLWITHUPSELL:
                speechOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY');
                repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                break;
            default:
                speechOutput = requestAttributes.t('NO_COMPRENDE');
                repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                break;
        }

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
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
            case states.PACKDONE:
                let idx = getRefIndex(attributes.drillStatus, attributes.currentDrillRef);
                attributes.drillStatus[idx].completed = false;
                return setupLevel(handlerInput);
            case states.QUIZ:
                return askAQuestion(handlerInput);
            case states.ENDOFLEVEL:
            case states.NEWSESSION:
            case states.REPLAYLEVEL:
                return setupLevel(handlerInput);
            case states.ENDOFDRILLWITHUPSELL:
                return makeUpsell('OK.', attributes.nextProd, handlerInput);  
            default:
                speechOutput = requestAttributes.t('NO_COMPRENDE');
                repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(repromptOutput)
                    .getResponse();
        }

    },
};

function getNextQuestion(handlerInput) {

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    if (attributes.questionNum < QUESTIONS.length) {
        attributes.questionNum++;
        var retval = requestAttributes.t('NEXT_QUESTION', attributes.questionNum, QUESTIONS[attributes.questionNum -1]);
    } else {
        if (attributes.levelScore !== QUESTIONS.length) { // not all answers were correct
            retval = requestAttributes.t('ASK_REPLAY_LEVEL', attributes.drillName, attributes.currentLevel, attributes.levelScore, QUESTIONS.length);
            attributes.skillState = states.REPLAYLEVEL;
        } else {
            if (attributes.currentLevel === attributes.drillLevels) { // all levels in this drill have been completed
                let idx = getRefIndex(attributes.drillStatus, attributes.currentDrillRef);
                attributes.drillStatus[idx].completed = true;
                attributes.skillState = states.ENDOFDRILLWITHUPSELL; // time to upsell
                console.log('2 - attributes.nextProd=' + attributes.nextProd);
                attributes.nextProd = ISPHelp.getNextPurchasableProduct(attributes.purchasableProducts);
                if (attributes.nextProd.name === undefined) { // undefined = no more packs to buy
                    retval = retval = requestAttributes.t('END_OF_DRILL_MSG1', attributes.drillName) + requestAttributes.t('WHAT_TO_DO_NEXT');
                } else {
                    retval = requestAttributes.t('END_OF_DRILL_MSG1', attributes.drillName) + requestAttributes.t('END_OF_DRILL_MSG2', attributes.nextProd.name);
                }
                console.log('2 - attributes.nextProd=' + attributes.nextProd);
            } else {
                attributes.skillState = states.ENDOFLEVEL;
                let idx = getRefIndex(attributes.drillStatus, attributes.currentDrillRef);
                attributes.drillStatus[idx].level += 1;
                retval = requestAttributes.t('END_LEVEL_MESSAGE_1', attributes.drillName, attributes.currentLevel,
                    attributes.levelScore, QUESTIONS.length) + requestAttributes.t('ASK_PLAY_NEXT_LEVEL');
            }
        }
    }

    return retval;
}

function askAQuestion(handlerInput) {

    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    let preamble = '';
    let theQuestion = '';
    attributes.skillState = states.AWAITINGANSWER;

    if (attributes.questionNum < QUESTIONS.length) {
        if (attributes.questionNum === 0) { //first question in this level
            preamble = requestAttributes.t('Q_PREAMBLE', attributes.drillName, attributes.currentLevel);
        }
        attributes.questionNum++;
        speechOutput = requestAttributes.t('THE_QUESTION', preamble, attributes.questionNum, QUESTIONS[attributes.questionNum -1]);
        //speechOutput = `${preamble}. Question ${attributes.questionNum}. ${QUESTIONS[attributes.questionNum -1]}`; // convert to requestattribute;
    //} else {
    //    speechOutput = "no more questions"; // convert
    }
    repromptOutput = speechOutput;

    if (supportsAPL(handlerInput)) {
        dataNextQuestion.bodyTemplate7Data.text.drill = attributes.drillName;
        dataNextQuestion.bodyTemplate7Data.text.level = requestAttributes.t('LEVEL_TXT', attributes.currentLevel, attributes.drillLevels, attributes.questionNum);
        dataNextQuestion.bodyTemplate7Data.text.question = QUESTIONS[attributes.questionNum - 1];
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

    attributes.levelScore = 0;
    attributes.skillState = states.QUIZ;
    attributes.questionNum = 0;

    let userId = handlerInput.requestEnvelope.context.System.user.userId;
    const QANDA = drillSetup.setupDrill(attributes, userId);
    QUESTIONS = QANDA.QUESTIONS;
    ANSWERS = QANDA.ANSWERS;

    let intro = '<audio src="soundbank://soundlibrary/gameshow/gameshow_02"/>';
    if (attributes.launchCount === 1 && attributes.setupLevelCounter === 0) {
        intro += requestAttributes.t('FIRST_TIME', attributes.drillName, attributes.drillLevels); // e.g. perfect intervals, 12 levels;
    } else {
        let idx = getRefIndex(attributes.drillStatus, attributes.currentDrillRef);
        if (attributes.drillStatus[idx].completed === true) {
            intro += requestAttributes.t('WELCOME_BACK_PACK_COMPLETE', attributes.drillName);
            attributes.skillState = states.PACKDONE;
        } else {
            intro += requestAttributes.t('WELCOME_BACK', attributes.drillName, attributes.currentLevel) + requestAttributes.t('ASK_IF_READY');
        }
    }

    attributes.setupLevelCounter += 1; // primarialy used to check for the 1st ever call to setuplevel

    speechOutput = intro;
    repromptOutput = requestAttributes.t('ASK_IF_READY');
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

const HelpHandler = {
    canHandle(handlerInput) {
        console.log('Inside HelpHandler');
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        console.log('Inside HelpHandler - handle');
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        speechOutput = requestAttributes.t('HELP_MESSAGE_LONG', ISPHelp.getSpeakableListOfDrills(drills), attributes.drillName);
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
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    speechOutput = '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_outro_01"/>' + '<break time="1s"/>' + 
                    requestAttributes.t('BYE_YALL');
    response.withShouldEndSession(true);

    // Display rotating circle for devices with displays
    data.bodyTemplate7Data.video.type = 'outro';

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

function makeUpsell(preUpsellMessage, prodToUpsell, handlerInput) {
    console.log('upselling');
    console.log(prodToUpsell.referenceName);

    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    let upsellMessage = `${preUpsellMessage} ${prodToUpsell.summary}. ${requestAttributes.t('RANDOM_LEARN_MORE_PROMPT', prodToUpsell.name)}`;

    return handlerInput.responseBuilder
        .addDirective({
            type: 'Connections.SendRequest',
            name: 'Upsell',
            payload: {
                InSkillProduct: {
                    productId: prodToUpsell.productId
                },
                'upsellMessage': upsellMessage
            },
            token: 'correlationToken'
        })
        .getResponse();
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

        if (supportsAPL(handlerInput)) {
            dataPurchaseHistory.purchaseHistoryData.textContent.text = "here we go <br> and another line";
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(repromptOutput)
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    document: tempPurchaseHistory,
                    datasources: dataPurchaseHistory
                })
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(repromptOutput)
                .getResponse();
        }
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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        if (attributes.purchasableProducts.length > 0) { // please convert to requestattributes
            //One or more products are available for purchase. say the list of products
            speechOutput = requestAttributes.t('AVAILABLE_TO_BUY_YES', ISPHelp.getSpeakableListOfProducts(attributes.purchasableProducts)) +
            requestAttributes.t('WHAT_TO_DO_NEXT');
            repromptOutput = requestAttributes.t('WHAT_TO_DO_NEXT');
        } else {
            // no products are available for purchase.
            speechOutput = requestAttributes.t('AVAILABLE_TO_BUY_NO') + requestAttributes.t('WHAT_TO_DO_NEXT');
            repromptOutput = requestAttributes.t('WHAT_TO_DO_NEXT');
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
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (handlerInput.requestEnvelope.request.intent.slots.packToPlay.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
            speechOutput = requestAttributes.t('NO_COMPRENDE') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
            repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
            if (supportsAPL(handlerInput)) {
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(repromptOutput)
                    .addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.1',
                        document: tempUnknownProduct,
                        datasources: dataUnknownProduct
                    })
                    .getResponse();
            } else {
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(repromptOutput)
                    .getResponse();
            }
        }

        // No need to check enetitlement if free pack is requested
        let packRef = handlerInput.requestEnvelope.request.intent.slots.packToPlay.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        if (packRef === freePackRef) {
            attributes.currentDrillRef = packRef;
            return setupLevel(handlerInput);
        }
       
        // Let's see if the user is entitled to play the requested pack
        return monetizationClient.getInSkillProducts(locale).then((res) => {
            let packRef = handlerInput.requestEnvelope.request.intent.slots.packToPlay.resolutions.resolutionsPerAuthority[0].values[0].value.id;
            if (ISPHelp.isEntitled(attributes.entitledProducts, packRef)) {
                attributes.currentDrillRef = packRef; //
                return setupLevel(handlerInput);
            } else {
                //use packRef to get productId
                attributes.nextProd = ISPHelp.getProductByRef(attributes.purchasableProducts, packRef);
                return makeUpsell(requestAttributes.t('NOT_OWNED', attributes.nextProd[0].name), attributes.nextProd[0], handlerInput);
            }
        });
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
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (handlerInput.requestEnvelope.request.intent.slots.productCategory.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
            //whatever the user said didn't match a packType so don't proceed
            speechOutput = requestAttributes.t('NO_COMPRENDE') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
            repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
            if (supportsAPL(handlerInput)) {
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(repromptOutput)
                    .addDirective({
                        type: 'Alexa.Presentation.APL.RenderDocument',
                        version: '1.1',
                        document: tempUnknownProduct,
                        datasources: dataUnknownProduct
                    })
                    .getResponse();
            } else {
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(repromptOutput)
                    .getResponse();
            }
        }

        let packRef = handlerInput.requestEnvelope.request.intent.slots.productCategory.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        console.log('packref=' + packRef + ', freepackref=' + freePackRef);
        if (packRef === freePackRef) {
            // nothing to buy
            attributes.currentDrillRef = packRef;
            if (attributes.launchCount === 1) {
                attributes.launchCount += 1; // if we get here on the first launch, increment launchCount so we don't get the welcome
            }
            return setupLevel(handlerInput);
        }

        return ms.getInSkillProducts(locale).then(function (res) {
            let product = res.inSkillProducts.filter(record => record.referenceName === packRef); //filter the reference name
            return handlerInput.responseBuilder
                .addDirective({
                    'type': 'Connections.SendRequest',
                    'name': 'Buy',
                    'payload': {
                        'InSkillProduct': {
                            'productId': product[0].productId
                        }
                    },
                    'token': 'correlationToken'
                })
                .getResponse();
        });

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
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        if (handlerInput.requestEnvelope.request.intent.slots.packToReturn.resolutions.resolutionsPerAuthority[0].status.code === 'ER_SUCCESS_NO_MATCH') {
            //whatever the user said didn't match a packType so don't proceed
            speechOutput = requestAttributes.t('NOT_REFUNDABLE') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY');
            repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(repromptOutput)
                .getResponse();
        }

        let packRef = handlerInput.requestEnvelope.request.intent.slots.packToReturn.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        if (packRef === freePackRef) {
            // nothing to buy
            attributes.currentDrillRef = packRef;
            if (attributes.launchCount === 1) {
                attributes.launchCount += 1; // if we get here on the first launch, increment launchCount so we don't get the welcome
            }
            speechOutput = requestAttributes.t('NOT_REFUNDABLE') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY');
            repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(repromptOutput)
                .getResponse();
        }

        return ms.getInSkillProducts(locale).then((res) => {
            const product = res.inSkillProducts.filter(
                record => record.referenceName === packRef,
            );
            return handlerInput.responseBuilder
                .addDirective({
                    type: 'Connections.SendRequest',
                    name: 'Cancel',
                    payload: {
                        InSkillProduct: {
                            productId: product[0].productId,
                        },
                    },
                    token: 'correlationToken',
                })
                .getResponse();
        });

    }
};

const BuyAndUpsellResponseHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'Connections.Response' &&
            (handlerInput.requestEnvelope.request.name === 'Buy' ||
                handlerInput.requestEnvelope.request.name === 'Upsell' ||
                handlerInput.requestEnvelope.request.name === 'Cancel');
    },
    handle(handlerInput) {
        console.log('IN: BuyResponseHandler.handle');
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const locale = handlerInput.requestEnvelope.request.locale;
        const ms = handlerInput.serviceClientFactory.getMonetizationServiceClient();

        return ms.getInSkillProducts(locale).then(async function handlePurchaseResponse(res) {

            if (handlerInput.requestEnvelope.request.status.code === '200') {
                let speechOutput = "";
                const attributes = handlerInput.attributesManager.getSessionAttributes();

                switch (handlerInput.requestEnvelope.request.payload.purchaseResult) {
                    case 'ACCEPTED':
                        if (handlerInput.requestEnvelope.request.name === 'Cancel') { // refund
                            speechOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY');
                            repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                        } else {
                            let newEntitledProduct = ISPHelp.getEntitledProduct(attributes.entitledProducts, handlerInput.requestEnvelope.request.payload.productId);
                            attributes.currentDrillRef = newEntitledProduct[0].referenceName;
                            return setupLevel(handlerInput);
                        }
                        break;
                    case 'DECLINED':
                        let declinedProduct = ISPHelp.getPurchasableProduct(attributes.purchasableProducts, handlerInput.requestEnvelope.request.payload.productId);
                        speechOutput = requestAttributes.t('PACK_DECLINED_MSG1') + requestAttributes.t('PACK_DECLINED_MSG2', declinedProduct[0].name);
                        repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                        break;
                    case 'ALREADY_PURCHASED':
                        speechOutput = requestAttributes.t('WHAT_TO_DO_NEXT');
                        repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                        break;
                    default:
                        speechOutput = requestAttributes.t('SOMETHING_WENT_WRONG') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                        repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                        break;
                }
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(repromptOutput)
                    .getResponse();
            }

            // Something failed.
            console.log(`Connections.Response indicated failure. error: ${handlerInput.requestEnvelope.request.status.message}`);

            return handlerInput.responseBuilder
                .speak(requestAttributes.t('BUY_AND_UPSELL_ERROR'))
                .getResponse();
        });

    },
};

const TellMeMoreAboutPackIntentHandler = {
    canHandle(handlerInput) {
        console.log('inside TellMeMoreAboutPackIntentHandler');
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'TellMeMoreAboutPackIntent';
    },
    handle(handlerInput) {
        console.log('handling TellMeMoreAboutPackIntentHandler');
        const locale = handlerInput.requestEnvelope.request.locale;
        const monetizationClient = handlerInput.serviceClientFactory.getMonetizationServiceClient();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        let packRef = handlerInput.requestEnvelope.request.intent.slots.productCategory.resolutions.resolutionsPerAuthority[0].values[0].value.id;

        if (packRef === freePackRef) {
            speechOutput = requestAttributes.t('PERFECT_INTERVALS_SUMMARY');
            repromptOutput = speechOutput;
            attributes.currentDrillRef = packRef; //
            if (attributes.launchCount === 1) {
                attributes.launchCount += 1; // if we get here on the first launch, increment launchCount so we don't get the welcome
            }
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(repromptOutput)
                .getResponse();
        }
        return monetizationClient.getInSkillProducts(locale).then((res) => {
            let product = res.inSkillProducts.filter(record => record.referenceName === packRef); //filter the reference name
            console.log('attributes.nextProd=' + attributes.nextProd);
            attributes.nextProd = ISPHelp.getNextPurchasableProduct(attributes.purchasableProducts);
            console.log('attributes.nextProd=' + attributes.nextProd);
            return makeUpsell(requestAttributes.t('AFFERMATIVE_RESPONSE'), product[0], handlerInput);

        });
    },
};

const OtherIntentHandlers = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.RepeatIntent' ||
                request.intent.name === 'AMAZON.NextIntent' ||
                request.intent.name === 'AMAZON.PreviousIntent' ||
                request.intent.name === 'AMAZON.MoreIntent' ||
                request.intent.name === 'AMAZON.StartOverIntent')
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        speechOutput = requestAttributes.t('NO_COMPRENDE') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
        repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
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

        switch (attributes.skillState) {
            case states.AWAITINGANSWER:
                    speechOutput = requestAttributes.t('NO_COMPRENDE') + 
                                    requestAttributes.t('THE_QUESTION', '', attributes.questionNum, QUESTIONS[attributes.questionNum -1]);
                    repromptOutput = speechOutput;
                    break;
            default:
                speechOutput = requestAttributes.t('NO_COMPRENDE') + requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                repromptOutput = requestAttributes.t('WHAT_CAN_I_PLAY_OR_BUY_REPROMPT');
                break;
        }

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
    },

};

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
                            persistentAttributes.setupLevelCounter = 0;
                            persistentAttributes.very1st = true;
                        }
                        persistentAttributes.launchCount += 1;
                        persistentAttributes.skillState = states.NEWSESSION;
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

    return drills[DRILLREF].levels[level];

}

function getRefIndex(drillstatus, drillref) {
    // get the index of the drill in drillstatus
    for (var key in drillstatus) {
        var value = drillstatus[key];
        if (value.drill === drillref)
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
        TellMeMoreAboutPackIntentHandler,
        RefundPackIntentHandler,
        AnswerHandler,
        HelpHandler,
        ExitHandler,
        FallbackHandler,
        OtherIntentHandlers,
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