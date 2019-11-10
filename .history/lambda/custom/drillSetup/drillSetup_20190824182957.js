exports.setupDrill_PerfectIntervals = function (attributes) {

    const constants = require('../constants');
    const drills = constants.drills;
    const util = require('../utils');

    const levelData = drills[attributes.currentDrill]['levels'][attributes.currentlevel - 1]; // drill/round
    const levelArray = util.shuffleArray(levelData['data']);

    const interval = levelData['interval'];
    const circleWithEnharmonics = constants.circleWithEnharmonics;
    const intervalQuestions = constants.questionTempltes.intervalQuestions;

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
    }

    return QA;
}

exports.setupDrill_RelativeKeys = function (attributes) {

    const constants = require('../constants');
    const drills = constants.drills;
    const util = require('../utils');

    const levelData = drills[attributes.currentDrill]['levels'][attributes.currentlevel - 1];
    const levelArray = util.shuffleArray(levelData['data']);
    const quality = levelData['quality'];

    const circleWithEnharmonics = constants.circleWithEnharmonics;
    const relativeKeyQuestions = constants.questionTempltes.relativeKeyQuestions;

    let QA = {
        "QUESTIONS": [],
        "ANSWERS": [],
    }

    //Loop through array and extract the fulll details for each key
    for (i = 0; i < levelArray.length; i++) {
        const keyToFind = levelArray[i];

        if (quality === 'major') {
            //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
            pos = circleWithEnharmonics.map(function (e) {
                return e.keyInfo.relMin;
            }).indexOf(keyToFind);
        } else if (quality === 'minor') {
            //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
            pos = circleWithEnharmonics.map(function (e) {
                return e.keyInfo.relMaj;
            }).indexOf(keyToFind);
        }

        const Q = Math.floor(Math.random() * 2); // zero or 1
        let QUESTION = relativeKeyQuestions[quality][Q].replace(/\[key\]/g, keyToFind); // replace placeholder with the key
        ANSWER = quality === 'minor' ? circleWithEnharmonics[pos]['keyInfo']['relMin'] : circleWithEnharmonics[pos]['keyInfo']['relMaj'];

        QA.QUESTIONS.push(QUESTION);
        QA.ANSWERS.push(ANSWER);
    }

    return QA;

}

exports.setupDrill_KeySignatures = function (attributes) {

    const constants = require('../constants');
    const drills = constants.drills;
    const util = require('../utils');

    const levelData = drills[attributes.currentDrill]['levels'][attributes.currentlevel - 1];
    const levelArray = util.shuffleArray(levelData['data']);
    const quality = levelData['quality'];

    const circleWithEnharmonics = constants.circleWithEnharmonics;
    const keySignatureQuestions = constants.questionTempltes.keySignatureQuestions;

    let QA = {
        "QUESTIONS": [],
        "ANSWERS": [],
    }

    //Loop through array and extract the fulll details for each key
    for (i = 0; i < levelArray.length; i++) {
        const keyToFind = levelArray[i];

        if (quality === 'major') {
            //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
            pos = circleWithEnharmonics.map(function (e) {
                return e.keyInfo.relMaj;
            }).indexOf(keyToFind);
        } else if (quality === 'minor') {
            //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
            pos = circleWithEnharmonics.map(function (e) {
                return e.keyInfo.relMin;
            }).indexOf(keyToFind);
        }

        var sharps = circleWithEnharmonics[pos].keyInfo.signature.hasOwnProperty('sharps') ? circleWithEnharmonics[pos].keyInfo.signature.sharps : undefined;
        var flats = circleWithEnharmonics[pos].keyInfo.signature.hasOwnProperty('flats') ? circleWithEnharmonics[pos].keyInfo.signature.flats : undefined;
        var num = sharps === undefined ? flats : sharps;

        const Q = Math.floor(Math.random() * 2); // zero or 1
        var sign = sharps === undefined ? flats === 1 && Q === 0 ? 'flat' : 'flats' : sharps === 1 && Q === 0 ? 'sharp' : 'sharps';
        // if num is zero the key is c major or a minor in which case randomize the sign.
        if (num === 0) {
            sign = Math.floor(Math.random() * 2) === 0 ? 'sharps' : 'flats';
        }

        let QUESTION = Q === 0 ? keySignatureQuestions[quality][Q].replace(/\[number\]/g, num).replace(/\[sign\]/g, sign) :
            keySignatureQuestions[quality][Q].replace(/\[key\]/g, keyToFind).replace(/\[sign\]/g, sign);

        if (Q === 1) {
            // don't care about the quality here
            ANSWER = num;
        } else if (quality === 'major') {
            ANSWER = circleWithEnharmonics[pos]['keyInfo']['relMaj'];
        } else {
            // quality must be minor
            ANSWER = circleWithEnharmonics[pos]['keyInfo']['relMin'];
        }

        QA.QUESTIONS.push(QUESTION);
        QA.ANSWERS.push(ANSWER);
    }

    return QA;

}