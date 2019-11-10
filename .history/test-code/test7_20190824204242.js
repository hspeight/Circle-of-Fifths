const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

const attributes = {
    currentDrill: 2,
    currentlevel: 1
}
const levelData = drills[attributes.currentDrill]['levels'][attributes.currentlevel - 1];

//console.log(levelData);

const levelArray = util.shuffleArray(levelData['data']);

//console.log(levelArray);

const quality = levelData['quality'];

console.log(quality);

const circleWithEnharmonics = constants.circleWithEnharmonics;
const keySignatureQuestions = constants.questionTempltes.keySignatureQuestions;

let QA = {
    "QUESTIONS": [],
    "ANSWERS": [],
}

//Loop through array and extract the fulll details for each key
for (i = 0; i < levelArray.length; i++) {
    const keyToFind = levelArray[i];
    console.log(keyToFind);


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
    console.log(pos);
    console.log('*************************');
    console.log(circleWithEnharmonics[pos].keyInfo.signature);
    console.log('*************************');

    //console.log(circleWithEnharmonics[pos]);
    var sharps = circleWithEnharmonics[pos].keyInfo.signature.hasOwnProperty('sharps') ? circleWithEnharmonics[pos].keyInfo.signature.sharps : undefined;
    var flats = circleWithEnharmonics[pos].keyInfo.signature.hasOwnProperty('flats') ? circleWithEnharmonics[pos].keyInfo.signature.flats : undefined;
    var num = sharps === undefined ? flats : sharps;

    console.log(pos + '/' + sharps + '/' + flats + ' - sig to use is ' + sign);
    //const Q = Math.floor(Math.random() * 2); // zero or 1
    const Q = 0;
    var sign = sharps === undefined ? flats === 1 && Q === 0 ? 'flat' :'flats' : sharps === 1 && Q === 0 ? 'sharp' : 'sharps';
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
    console.log(QA.QUESTIONS);
    console.log(QA.ANSWERS);

console.log(QA.ANSWERS[0].toString());
    var enharmonic = QA.ANSWERS[0].toString().split('/');
}
