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
    //console.log('*************************');
    //console.log(circleWithEnharmonics[pos].keyInfo.signature);
    //console.log('*************************');

    //console.log(circleWithEnharmonics[pos]);
    var sharps = circleWithEnharmonics[pos].keyInfo.signature.hasOwnProperty('sharps') ? circleWithEnharmonics[pos].keyInfo.signature.sharps : undefined;
    var flats = circleWithEnharmonics[pos].keyInfo.signature.hasOwnProperty('flats') ? circleWithEnharmonics[pos].keyInfo.signature.flats : undefined;
    var sig = sharps === undefined ? flats : sharps;

    console.log(pos + '/' + sharps + '/ ' + flats + ' sig to use is ' + sig);
    //const Q = Math.floor(Math.random() * 2); // zero or 1
    const Q = 0;
    let QUESTION = keySignatureQuestions[quality][Q].replace(/\[number\]/g, sharps).replace(/\[sign\]/g, 'sharps'); // replace placeholder with the key
    console.log(keySignatureQuestions[quality][Q]);
    console.log(QUESTION);
    ANSWER = quality === 'minor' ? circleWithEnharmonics[pos]['keyInfo']['relMin'] : circleWithEnharmonics[pos]['keyInfo']['relMaj'];

    QA.QUESTIONS.push(QUESTION);
    QA.ANSWERS.push(ANSWER);
    console.log(QA.QUESTIONS);
    console.log(QA.ANSWERS);
}