exports.setupDrill_PerfectIntervals = function (attributes) {

    const constants = require('../constants');
    const drills = constants.drills;
    const util = require('../utils');

    const levelData = drills[attributes.currentDrill]['levels'][attributes.currentlevel - 1]; // drill/round
    console.log(levelData);
    const levelArray = util.shuffleArray(levelData['data']);

    const interval = levelData['interval'];
    const circleWithEnharmonics = constants.circleWithEnharmonics;
    const intervalQuestions = constants.intervalQuestions;

    //QUESTIONS = [];
    //ANSWERS = [];

    let QA = {
        "QUESTIONS": [],
        "ANSWERS": [],
    }

    //Loop through array and extract the fulll details for each key
    for (i = 0; i < levelArray.length; i++) {
        const keyToFind = levelArray[i];

        //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
        const pos = circleWithEnharmonics.map(function (e) {
            return e.keyInfo.relMaj;
        }).indexOf(keyToFind);

        const Q = Math.floor(Math.random() * 2); // zero or 1
        QUESTION = intervalQuestions[interval][Q].replace(/placeholder/g, keyToFind); // replace placeholder with the key
        ANSWER = Q === 0 ? circleWithEnharmonics[pos]['keyInfo']['intervals']['fifth'] : circleWithEnharmonics[pos]['keyInfo']['intervals']['fourth'];

        QA.QUESTIONS.push(QUESTION);
        QA.ANSWERS.push(ANSWER);
        console.log(QA.QUESTIONS);
        console.log(QA.ANSWERS);
    }

    return QA;
}

exports.setupDrill_RelativeKeys = function (attributes) {

    const constants = require('../constants');
    const drills = constants.drills;
    const util = require('../utils');

    let QA = {
        "QUESTIONS": ['relative keys q1'],
        "ANSWERS": ['relative keys a1'],
    }

    return QA;

}