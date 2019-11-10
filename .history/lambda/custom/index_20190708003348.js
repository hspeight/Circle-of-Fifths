/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

const skillName = 'Circle Of Fifths';
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const util = require('./utils');
//const dbHelper = require('./helpers/dbHelper');

const languageStrings = {
    'en' : require('./i18n/en'),
//    'it' : require('./i18n/it')
}
const states = {
    START: '_START',
    RESTART: '_RESTART',
    QUIZ: '_QUIZ',
    END: '_END',
};

// This is required for bespoken proxy to work
var AWS = require('aws-sdk');
//var awsConfig = require('aws-config');
AWS.config.update({
    region: "us-east-1"
});

//http://whatdidilearn.info/2018/09/16/how-to-keep-state-between-sessions-in-alexa-skill.html
const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
const tableName = 'COF-USERS';
const partitionKeyName = 'COF-USERID';
//const region = 'us-east-1';
const persistenceAdapter = new DynamoDbPersistenceAdapter({
  tableName,
  partitionKeyName,
  //region,
  createTable: false
});

/*
const displayIntro1 = 'Test your knowledge of the circle of fifths in intervals of perfect ';
const displayIntro3 = ' will give you a test containing a combination of both.';
const validQuiz = ['fourths', 'fifths', 'random', '4ths', '4th', '5ths', '5th'];
*/

// Key,4th,5th,sharps,flats,relative minor
var circleKeys = [
    //['c', 'f', 'g', '0', '0', 'a'],
    //['f', 'b flat', 'c', '0', '1', 'd'],
    //['g', 'c', 'd', '1', '0', 'e'],
    //['b flat', 'e flat', 'f', '0', '2', 'g'],
    //['e flat', 'a flat', 'b flat', '0', '3', 'c']
    //['a flat', 'd flat', 'e flat', '0', '4','f'],
    ['d flat', 'g flat', 'a flat', '0', '5', 'b flat'],
    //['g flat', 'b', 'd flat', '0', '6', 'e flat'],
    //['b', 'e', 'g flat', '5', '0', 'g sharp']
    //['e', 'a', 'b', '4', '0', 'c sharp'],
    //['a', 'd', 'e', '3', '0', 'f sharp'],
    //['d', 'g', 'a', '2', '0', 'b'],
    //['c sharp', 'a flat', 'g flat or f sharp', '7', '0', 'a sharp'],
    //['f sharp', 'b', 'd flat or c sharp', '6', '0', 'd sharp'],
    //['c flat', 'e', 'g flat or f sharp', '0', '7', 'a flat'] ,
];
const numQuestions = circleKeys.length;
var dataRandomized = []; // an array to hold a randomized version of the above circleKeys array

// Both f sharp & g flat are the fifth of B so what you gonna do about that!
var fifteenKeys = ['c', 'f', 'b flat', 'e flat', 'a flat', 'd flat', 'c sharp',
    'g flat', 'f sharp', 'b', 'c flat', 'e', 'a', 'd', 'g'];
//var fifteenKeys = ['c', 'g flat', 'a flat', 'd flat',  'e'];

var keyQuestionArray = []; // Array to hold the key included in the question.
var questionArray = [];
var multiChoiceArray = [];
var relQuestions4th = ['what is the fourth of X?', 'what is X the fourth of?'];
var relQuestions5th = ['what is the fifth of X?', 'what is X the fifth of?'];
var relQuestionsBoth = relQuestions4th.concat(relQuestions5th);
var relAnswers = [];
var lastQuestionAsked = '';
var speechOutput = '';
var reprompt = '';
/*
const mainImage = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/COF_4.png';
const mainImgBlurBG = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/pianokeys2.jpg';
const trophyImage = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/trophy-01_icarus.png';
const gameEndImageNot100 = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/COF_background_game_end_not_100_percent.png';
const gameEndImage100 = 'https://s3-eu-west-1.amazonaws.com/circle-of-fifths/COF_background_game_end_100_percent.png';
*/

/* INTENT HANDLERS */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        console.log('Inside LaunchRequestHandler ++++++++++++++++');
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        console.log('Handling LaunchRequest');

        const data = require('./api/data/main.json');
        const template = require('./api/templates/main.json');
        //const template = require('./api/templates/launchrequest.json');

        const attributesManager = handlerInput.attributesManager;
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        //https://raw.githubusercontent.com/alexa/skill-sample-nodejs-highlowgame/master/lambda/custom/index.js
        const attributes = await attributesManager.getPersistentAttributes() || {}; // <--dynamodb
        if (Object.keys(attributes).length === 0) {
            attributes.invocations = 0; // Number of time the skill has been launched for this user
            attributes.drill = 1;
            atrributes.round = 1;
        }
        attributes.invocations++;
        attributes.skillState = states.START
        attributesManager.setSessionAttributes(attributes);

        //speechOutput = requestAttributes.t('WELCOME_MESSAGE_FIRST_TIME');
        speechOutput = 'Welcome to circle of fifths. My aim is to make you a circle ninja. ' +
                        'Your first drill is called perfect fifths. This drill consists of five rounds. ' +
                        'In round one I will give you a key on the circle of fifths and ask you to ' +
                        ' name the key that is a perfect fifth away. There are ten questions in this round. Are you ready?';
        //reprompt = requestAttributes.t('WELCOME_MESSAGE_FIRST_TIME_REP');
        reprompt = 'Are you ready to begin drill one round one?';

        console.log('HERE======================');
        if (supportsAPL(handlerInput)) {
            handlerInput.responseBuilder
            .addDirective({
                type : 'Alexa.Presentation.APL.RenderDocument',
                version: '1.0',
                document : template,
                datasources : data
            });
        }
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();

        //return showSkillIntro(speechOutput, reprompt, handlerInput);
    },
};

/*
const DrillHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        console.log('Inside Drill Handler');
        //console.log(JSON.stringify(request));
        return request.type === "IntentRequest" && request.intent.name === "DrillIntent";
    },
    handle(handlerInput) {
        console.log("Handling  Drill Handler");
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const response = handlerInput.responseBuilder;

        var mySlot = '';
        var speechOutput = '';
        var repromptOutput = '';

        mySlot = handlerInput.requestEnvelope.request.intent.slots.TEST_TYPE.value;
        var ans = validQuiz.includes(mySlot);
        if (ans) {
            console.log('SETTING UP DRILL' + drill);
            //attributes.quizname = mySlot;
            return setupQuiz(handlerInput, mySlot);
        } else {
            // Can get to this point by either a bad quiz type or a bad multi choice answer
            //On second thought's this code may never be executed as it looks like this is caught by the fallback intent
            speechOutput = requestAttributes.t('UNKNOWN_TEST_NAME');
            repromptOutput = requestAttributes.t('HELP_MESSAGE_SHORT');
        }

        return response.speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
    },
};
*/

const AnswerHandler = {
    canHandle(handlerInput) {
        console.log("Inside Answer Handler");
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        console.log('attributes.skillState=' + attributes.skillState);
        const request = handlerInput.requestEnvelope.request;
        //console.log('... and request.intent.name=' + request.intent.name + ' and request.type=' + request.type + ' and attributes.skillState=' + attributes.skillState);
        return (request.type === 'IntentRequest' &&
            request.intent.name === 'AnswerIntent');
    },
    handle(handlerInput) {
        console.log("Handling Answer Handler");
        const response = handlerInput.responseBuilder;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        //if (attributes.skillState === states.END) {
        //    // game has ended but user replied with a number when asked to say fourths,fifths or random
        //    speechOutput = requestAttributes.t('ASK_PLAY_AGAIN');
        //    repromptOutput = requestAttributes.t('ASK_PLAY_AGAIN');
        //} else if (attributes.skillState === states.RESTART) {
            //console.log('attributes.skillState=' + attributes.skillState);
        //    speechOutput = requestAttributes.t('FALLBACK_MESSAGE');
        //    repromptOutput = requestAttributes.t('FALLBACK_MESSAGE');
        //} else if (attributes.skillState === undefined) {
            // user has said a number instead of a test name
        //    speechOutput = requestAttributes.t('WELCOME_MESSAGE_2');
        //    repromptOutput = requestAttributes.t('WELCOME_MESSAGE_2') + requestAttributes.t('FALLBACK_MESSAGE');
        //} else {
            repromptOutput = lastQuestionAsked;
            speechOutput = HandleTheAnswer(handlerInput, handlerInput.requestEnvelope.request.intent.slots.ANSWER.value);
            console.log('speechOutput=' + speechOutput);
        //}
        
        
        return response.speak(speechOutput)
        .reprompt(repromptOutput)
        .getResponse();
            
    },
};

function HandleTheAnswer(handlerInput, answerIn) {

    console.log('Handling the answer');
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    var speechOutput = '';

    //const utteredAnswer = answerIn;
    //if (utteredAnswer < 1 || utteredAnswer > languageStrings.en.translation.CHOICES) {
    //    console.log('uttered ' + utteredAnswer + ' isNaN(utteredAnswer)=' + isNaN(utteredAnswer));
    //    console.log(utteredAnswer + ' is a bad answer buddy');
    //    speechOutput = requestAttributes.t('OUT_OF_RANGE_MSG');
    //} else {
        attributes.counter += 1;
        //console.log('attributes.counter is now ' + attributes.counter);
        const isCorrect = isTheAnswerCorrect(attributes.correctAnswer, answerIn);
        if (isCorrect) {
            speechOutput = getSpeechCon(handlerInput, true);
            attributes.quizScore += 1;
        } else {
            speechOutput = getSpeechCon(handlerInput, false);
        }

        if (attributes.counter < drillKeys[attributes.round]) { // Number of keys in the array for this drill
            question = askQuestion(handlerInput);
            speechOutput += question;
            console.log('Asking question ' + attributes.counter + ' =========================== ' + speechOutput);
        } else {
            // last question has been asked
            speechOutput += marksOutOfTen(handlerInput); // well it might not actually be 10
            repromptOutput = repromptOutput = requestAttributes.t('ASK_PLAY_AGAIN');
            console.log('speechOutput=' + speechOutput);
            attributes.skillState = states.END;

        }
    //}

    //SAVE ATTRIBUTES
    handlerInput.attributesManager.setSessionAttributes(attributes);

    return speechOutput;
}

function getSpeechCon(handlerInput, type) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return type ? requestAttributes.t('CORRECT_ANSWER') : '<audio src="https://s3-eu-west-1.amazonaws.com/circle-of-fifths/wrong-answer.mp3"/>';
}

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        //console.log('In RepeatIntentHandler and request.name=' + request.intent.name);
                      
        return request.type === "IntentRequest" &&
            request.intent.name === "AMAZON.RepeatIntent";
    },
    handle(handlerInput) {
        console.log('Handling repeat intent');
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (attributes.skillState === states.END) {
            speechOutput = requestAttributes.t('NEW_TEST_MESSAGE');
            repromptOutput = requestAttributes.t('NEW_TEST_MESSAGE');
        } else {
            speechOutput = lastQuestionAsked;
            repromptOutput = lastQuestionAsked;
        }
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
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

        if (attributes.skillState === states.RESTART) {
            speechOutput = requestAttributes.t('RESTART_TEST_FALSE') + '. ' + lastQuestionAsked;
            attributes.skillState = states.QUIZ;
            handlerInput.attributesManager.setSessionAttributes(attributes);
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(lastQuestionAsked)
            .getResponse();
        } else {
            return exitSkill(handlerInput);
        }
        
    },
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        const response = handlerInput.responseBuilder;
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        var speechOutput = '';

        console.log('attributes.skillState=' + attributes.skillState);
        if (attributes.skillState === states.START) {
            return setupQuiz(handlerInput, attributes.drill, attributes.round);
            speechOutput = "Question 1. How many beans make 5?";
            repromptOutput = "Come on man. How many?";
        }
        /*
        if (attributes.skillState === states.END || attributes.skillState === states.RESTART) {
            // User want's a new test or to abandon current test
            speechOutput = requestAttributes.t('WELCOME_MESSAGE_2');
            repromptOutput = requestAttributes.t('WELCOME_MESSAGE_2');
        } else {
            speechOutput = lastQuestionAsked;
            repromptOutput = lastQuestionAsked;
        }
        */
        return response
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
    },
};

const StartOverHandler = { // don't allow restart if game has ended. See RepeatIntentHandler.
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        //console.log('In NewGameHandler. request.type=' + request.type +
        //    ', request.intent.name=' + request.intent.name);
        return request.type === "IntentRequest" &&
            request.intent.name === "AMAZON.StartOverIntent";
    },
    handle(handlerInput) {
        console.log('NEW GAME REQUESTED');
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        if (attributes.skillState === states.END) {
            speechOutput = requestAttributes.t('NEW_TEST_MESSAGE');
            repromptOutput = requestAttributes.t('NEW_TEST_MESSAGE');
        } else {
            speechOutput = requestAttributes.t('CONFIRM_RESTART_TEST');
            repromptOutput = requestAttributes.t('YES_OR_NO');
            attributes.skillState = states.RESTART;
            handlerInput.attributesManager.setSessionAttributes(attributes);
        }
        
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
    },
};

function askQuestion(handlerInput) {
    console.log('I am in askQuestion()');

    //GET SESSION ATTRIBUTES
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    const question = getQuestion(attributes.counter +1, questionArray[attributes.counter]);
    //console.log('Anwer to question ' + attributes.counter + ' is ' + relAnswers[attributes.counter -1]);
    //console.log('relAnswers=' + relAnswers);
    var correctAnswer = relAnswers[attributes.counter];

    //Remove the key that is the subject of the question so that it doesn't appear in the multi choice list
    //console.log('Removing ' + keyQuestionArray[attributes.counter] + ' from fifteenKeys');
    console.log('fifteenKeys before remove is ' + fifteenKeys);
    var shuffledKeyArray = util.reduceArray(fifteenKeys, keyQuestionArray[attributes.counter]);
    console.log('fifteenKeys after remove is ' + shuffledKeyArray);
    shuffledKeyArray = util.shuffleArray(shuffledKeyArray);

    var correctAnswerIndex = shuffledKeyArray.indexOf(correctAnswer);

    shuffledKeyArray.splice(correctAnswerIndex, 1);

    console.log('shuffledKeyArray=' + shuffledKeyArray);
    // Create a new array containing the first two elements of the shuffled key array
    var newArray = shuffledKeyArray.slice(0, 2);
    console.log('newArray before pushing correctAnswer=' + newArray);
    newArray.push(correctAnswer);
    console.log('newArray after pushing correctAnswer=' + newArray);

    multiChoiceArray = util.shuffleArray(newArray);
    console.log('multiChoiceArray=' + multiChoiceArray);
    var correctAnswerIndex = multiChoiceArray.indexOf(correctAnswer);
    attributes.correctAnswer = correctAnswerIndex + 1;

    // The splice method took the correct answer out of the array so put it back
    shuffledKeyArray.push(correctAnswer);
    //console.log('shuffledKeyArray is ' + shuffledKeyArray);
    var multiChoiceString = formatMultiChoiceString(multiChoiceArray);

    //SAVE ATTRIBUTES
    handlerInput.attributesManager.setSessionAttributes(attributes);
    console.log('question to save is ' + question);
    console.log('multiChoiceString is "' + multiChoiceString + '"');
    lastQuestionAsked = question + ' ' + multiChoiceString

    const itemList = [];
    for (i = 0, len = multiChoiceArray.length; i < len; i++) {
        //const optionText = multiChoiceArray[i];
        itemList.push(
            {
                "token": i+1,
                "textContent": new Alexa.RichTextContentHelper()
                .withPrimaryText(util.capitalizeAll(multiChoiceArray[i])).getTextContent(),
                //Can't change font color through tags so the below could be used to make the text color blue
                //.withPrimaryText('<action value="confirm_purchase">' + util.capitalizeAll(multiChoiceArray[i]) + '</action>').getTextContent(),
            }
        );
    }

    // Set up the list displaying the multi choice answers for devices with screens
    if (supportsDisplay(handlerInput)) {
        const title = 'Question ' + (attributes.counter +1)+ ' of  ' + numQuestions  + ' - ' + util.capitalizeFirst(questionArray[attributes.counter]);
        handlerInput.responseBuilder.addRenderTemplateDirective({
            type: 'ListTemplate1',
            token: 'string',
            backButton: 'hidden',
            title,
            listItems: itemList,
        });
    }

    return lastQuestionAsked;
}

function setupQuiz(handlerInput, drill, round) {
    console.log('setupQuiz for drill ' + drill + ', round ' + round);

    initAttributes(handlerInput); // review this

    // we get the translator 't' function from the request attributes
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;

    questionArray = [];
    relAnswers = [];
    dataRandomized = util.shuffleArray(drill01Keys[attributes.drill][attributes.round]); //pick up here lad
    console.log('dataRandomized is ' + dataRandomized);

    // Loop through the list of keys (12 or 15?) and generate a question & answer for each one.
    for (i = 0, len = numQuestions; i < len; i++) {
        var Q = Math.floor(Math.random() * (quiz === 'random' ? 4 : 2)); // four options for both, two options for 4ths & 5ths
        console.log('Q=' + Q);
        var KEY = dataRandomized[i][0];
        console.log('KEY=' + KEY);
        if (quiz.startsWith('4') || quiz.startsWith('four')) {
            console.log('4');
            var QUESTION = relQuestions4th[Q].replace("X", util.capitalizeAll(KEY)); // replace X with the key
            ANSWER = Q == 0 ? dataRandomized[i][1] : dataRandomized[i][2]; // element 1 is the 4th. Element 2 is the 5th.
        } else if (quiz.startsWith('5') || quiz.startsWith('fifth')) {
            console.log('5');
            var QUESTION = relQuestions5th[Q].replace("X", util.capitalizeAll(KEY)); // replace X with the key
            ANSWER = Q == 0 ? dataRandomized[i][2] : dataRandomized[i][1]; // element 1 is the 4th. Element 2 is the 5th.
        } else {
            var QUESTION = relQuestionsBoth[Q].replace("X", util.capitalizeAll(KEY)); // replace X with the key
            ANSWER = (Q == 0 || Q == 3) ? dataRandomized[i][1] : dataRandomized[i][2];
        }
        questionArray.push(QUESTION);
        relAnswers.push(ANSWER);
        keyQuestionArray.push(KEY);
        console.log('QUESTION=' + QUESTION);
        console.log('ANSWER=' + ANSWER);

    }

    attributes.skillState = states.QUIZ;
    attributes.skillTest = quiz;
    attributes.counter = 0;
    attributes.quizScore = 0;
    handlerInput.attributesManager.setSessionAttributes(attributes);

    var question = askQuestion(handlerInput);
    speechOutput = requestAttributes.t('GREETING') + question; // Preface the question with a random greeting
    repromptOutput = question;

    response.withShouldEndSession(null);

    return response
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
}

function getQuestion(counter, questionToAsk) {
    return `Question ${counter}. ${questionToAsk}`;
    //return `Here is your ${counter}th question. ${questionToAsk}`;
}

function formatMultiChoiceString(rawData) {
    console.log('rawData=' + rawData);
    var S = '';
    for (i = 0, len = rawData.length; i < len; i++) {
        S += (i + 1).toString() + '. ' +
            '<say-as interpret-as="spell-out">' +
            rawData[i].substring(0, 1) + '</say-as>' +
            rawData[i].substring(1, rawData[i].length) + '. ';
    }
    return S;
}

function marksOutOfTen(handlerInput) {
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    const percentScore = attributes.quizScore / numQuestions * 100;
    var superlative = '';
    if (percentScore > 99) {
        superlative = requestAttributes.t('SUPERLATIVE_100');
    } else if (percentScore > 79) {
        superlative = requestAttributes.t('SUPERLATIVE_80PLUS');
    } else {
        superlative = requestAttributes.t('SUPERLATIVE_NOT_SO_GOOD');
    }

    // attributes.percentScore will get saved in the calling function
    attributes.percentScore = percentScore;

    return requestAttributes.t('END_GAME_MESSAGE_1', attributes.quizScore, numQuestions) + '. ' 
                    + superlative + requestAttributes.t('ASK_PLAY_AGAIN');
}

const ElementSelectedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        //console.log('Inside ElementSelectedHandler with intent ' + request.intent.name + ' and type ' + request.type);
        return (request.type === 'IntentRequest' &&
            request.intent.name === 'ElementSelected')
            || request.type === 'Display.ElementSelected';
    },
    handle(handlerInput) {
        console.log('Handling ElementSelectedHandler');
        const attributes = handlerInput.attributesManager.getSessionAttributes();

        // not sure we can get here if the test was started by voice which would be good (less code required)
        if (handlerInput.requestEnvelope.request.token) {
            //User touched the screen
            console.log('user touched ' + handlerInput.requestEnvelope.request.token);
            console.log('attributes.skillState=' +attributes.skillState);
            if(attributes.skillState === undefined) {
                // token here should either be 'fourths', 'fifths' or 'random'
                return setupQuiz(handlerInput, handlerInput.requestEnvelope.request.token);
            } else {
                var optionSelected = handlerInput.requestEnvelope.request.token;
                if (isNaN(optionSelected))  {
                    console.log(optionSelected + " is not a number");
                 }else{
                    console.log(optionSelected + " is a number");
                 }
                speechOutput = HandleTheAnswer(handlerInput, optionSelected); // i.e. pass the element + 1
                console.log('ElementSelectedHandler speechOutput=' + speechOutput);
                if (attributes.skillState === states.END && supportsDisplay) {
                    console.log('ElementSelectedHandler End of game!')
                    return gameOverWithDisplay(handlerInput, speechOutput);
                } else {
                    return response.speak(speechOutput)
                    // reprompt needs proper test
                        .reprompt('Repeat. ' + repromptOutput)
                        .getResponse();
                }
            }

        }

    },
};



function isTheAnswerCorrect(correctAnswer, utteredAnswer) {
    console.log('Correct answer is ' + correctAnswer + '. ' + 'Uttered answer is ' + utteredAnswer);
    return correctAnswer == utteredAnswer ? true : false;
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

        if (attributes.skillState === states.QUIZ) {
            // if the user asked for help in the middle of a quiz tag the last question on to the end of the help text
            speechOutput = requestAttributes.t('MULTI_CHOICE_HELP_MSG') + lastQuestionAsked;
        } else if (attributes.skillState === states.END) {
            // if the user asked for help at the end of the game give them a short message
            speechOutput = requestAttributes.t('NEW_TEST_MESSAGE');
        } else {
            speechOutput = requestAttributes.t('HELP_MESSAGE_LONG');
        }
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(requestAttributes.t('HELP_MESSAGE_SHORT'))
            .getResponse();
    },
};

const HintHandler = {
    canHandle(handlerInput) {
        console.log('Inside HintHandler');
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' &&
            request.intent.name === 'HintIntent';
    },
    handle(handlerInput) {
        console.log('Inside HintHandler - handle');
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        return handlerInput.responseBuilder
            .speak("this is what the hint will say")
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
        const dbattributes = await handlerInput.attributesManager.getPersistentAttributes(); // <--dynamodb

        dbattributes.invocations = attributes.invocations;
        handlerInput.attributesManager.setPersistentAttributes(dbattributes);
        await handlerInput.attributesManager.savePersistentAttributes();
        // tell user progress has been saved
        return exitSkill(handlerInput);
    },
};

function exitSkill(handlerInput) {
    const response = handlerInput.responseBuilder;
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

    // If user does not have premium pack upsell every fourth? invocation
    const result = attributes.invocations % 3; // could make this a random number between say 4 and 6 (possibly)
    if (!result) {
        doUpsell();
    }

   response.withShouldEndSession(true);
   return response
        //.speak(requestAttributes.t('EXIT_SKILL_MESSAGE'))
        .speak('bye yall')
        .getResponse();

}

function doUpsell() {
    console.log('will upsell here');
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
        return request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        console.log('Handling FallbackHandler');
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        console.log('FallbackHandler attributes.skillState=' + attributes.skillState);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();

        speechOutput = requestAttributes.t('FALLBACK_MESSAGE');

        if (attributes.skillState === undefined) {
            // Give the user some additional help if we got here before any questions have been asked
            speechOutput += requestAttributes.t('HELP_MESSAGE_SHORT');
            repromptOutput = requestAttributes.t('HELP_MESSAGE_SHORT');
        } else if (attributes.skillState === states.END) {
            speechOutput += requestAttributes.t('HELP_MESSAGE_SHORT');
            repromptOutput = requestAttributes.t('HELP_MESSAGE_SHORT');
        } else if (attributes.skillState === states.RESTART) {
            speechOutput += requestAttributes.t('CONFIRM_RESTART_TEST');
            repromptOutput = requestAttributes.t('CONFIRM_RESTART_TEST');
        } else if (attributes.skillState === states.QUIZ) {
            // if the user gets here in the middle of a quiz reprompt with the last question
            speechOutput += requestAttributes.t('OUT_OF_RANGE_MSG');
            repromptOutput = lastQuestionAsked;
        }
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(repromptOutput)
            .getResponse();
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

// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
    var hasDisplay =
        handlerInput.requestEnvelope.context &&
        handlerInput.requestEnvelope.context.System &&
        handlerInput.requestEnvelope.context.System.device &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display
    return hasDisplay;
}

function showSkillIntro(pSpeechOutput, pReprompt, pHandlerInput) {
    console.log('In showSkillIntro');

    var speechOutput = pSpeechOutput;
    var reprompt = pReprompt
    //var cardTitle = skillName;

    if (supportsDisplay(pHandlerInput)) {
        const requestAttributes = pHandlerInput.attributesManager.getRequestAttributes();

        //Selectable text
        var actionText1 = '<action value="fourths"><b>' + validQuiz[0] + '</b></action>';
        var actionText2 = '<action value="fifths"><b>' + validQuiz[1] + '</b></action>';
        var actionText3 = '<action value="random"><b>' + validQuiz[2] + '</b></action>';

        var text = '<font size="5">'  + skillName + '</font><br/>' + displayIntro1 +
                    actionText1 + ' or ' + actionText2 + '.<br/>Chosing ' + 
                    actionText3 + displayIntro3;
        return bodyTemplateMaker('BodyTemplate2', pHandlerInput, mainImage, null, text, null, null, 
                speechOutput, reprompt, requestAttributes.t('HINT_1'), mainImgBlurBG, false);
    } else {
        const response = pHandlerInput.responseBuilder;

        return response
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
}

function initAttributes(handlerInput) {

    const attributes = handlerInput.attributesManager.getSessionAttributes(); // need to make sure they are set before doing this

    attributes.skillState = null;
    attributes.counter = 0;
    attributes.quizScore = 0;
    attributes.percentScore = 0;
    
    handlerInput.attributesManager.setSessionAttributes(attributes);
}

function bodyTemplateMaker(pBodyTemplateType, pHandlerInput, pImg, pTitle, pText1, pText2, pText3, pOutputSpeech, pReprompt, pHint, pBackgroundIMG, pEndSession) {
    const response = pHandlerInput.responseBuilder;
    const image = imageMaker("", pImg);
    const richText = richTextMaker(pText1, pText2, pText3);
    const backgroundImage = imageMaker("", pBackgroundIMG);
    const title = pTitle;

    response.addRenderTemplateDirective({
        type: pBodyTemplateType,
        backButton: 'HIDDEN',
        image,
        backgroundImage,
        title,
        textContent: richText,
    });

    if (pHint)
        response.addHintDirective(pHint);

    if (pOutputSpeech)
        response.speak(pOutputSpeech);

    if (pReprompt)
        response.reprompt(pReprompt)

    if (pEndSession)
        response.withShouldEndSession(pEndSession);

    return response.getResponse();
}

function imageMaker(pDesc, pSource) {
    const myImage = new Alexa.ImageHelper()
        .withDescription(pDesc)
        .addImageInstance(pSource)
        .getImage();

    return myImage;
}

function richTextMaker(pPrimaryText, pSecondaryText, pTertiaryText) {
    const myTextContent = new Alexa.RichTextContentHelper();

    if (pPrimaryText)
        myTextContent.withPrimaryText(pPrimaryText);

    if (pSecondaryText)
        myTextContent.withSecondaryText(pSecondaryText);

    if (pTertiaryText)
        myTextContent.withTertiaryText(pTertiaryText);

    return myTextContent.getTextContent();
}

function gameOverWithDisplay(handlerInput, speechOutput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    // if the user gets 100% display the tropy otherwise just an end game message
    if (attributes.percentScore == 100) {
        return bodyTemplateMaker('BodyTemplate2', handlerInput, trophyImage, 'End of ' + attributes.skillTest + ' test',
        "<div align='center'><font size='5'>" + requestAttributes.t('END_GAME_MESSAGE_1', attributes.quizScore, numQuestions) + "</font></div>",
        "<div align='center'><font size='4'>" + requestAttributes.t('TESTS_AVAILABLE') + "</font></div>",
        null, speechOutput, repromptOutput, null, gameEndImage100, false);
    } else {
        return bodyTemplateMaker('BodyTemplate1', handlerInput, null, 'End of ' + attributes.skillTest + ' test',
        "<div align='center'><font size='5'>" + requestAttributes.t('END_GAME_MESSAGE_1', attributes.quizScore, numQuestions) + "</font></div>",
        "<div align='center'><font size='4'>" + requestAttributes.t('TESTS_AVAILABLE') + "</font></div>",
        null, speechOutput, repromptOutput, null, gameEndImageNot100, false);
    }
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

var skillBuilder = Alexa.SkillBuilders.custom();

/* LAMBDA SETUP */
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        RepeatIntentHandler,
        StartOverHandler,
        //QuizHandler,
        //QuizAnswerHandler,
        ElementSelectedHandler,
        HelpHandler,
        HintHandler,
        ExitHandler,
        FallbackHandler,
        NoIntentHandler,
        YesIntentHandler,
        SessionEndedRequestHandler
    )
    .addRequestInterceptors(LocalizationInterceptor) 
    .withPersistenceAdapter(persistenceAdapter) // <-- dynamodb
    .addErrorHandlers(ErrorHandler)
    .lambda();