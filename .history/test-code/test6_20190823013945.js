const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

const attributes = {
    currentDrill: 1,
    currentlevel: 1
}
const levelData = drills[attributes.currentDrill]['levels'][attributes.currentlevel - 1];

//console.log(levelData);

const levelArray = util.shuffleArray(levelData['data']);

//console.log(levelArray);

const quality = levelData['relative'];

console.log(quality);

const circleWithEnharmonics = constants.circleWithEnharmonics;
const relativeKeyQuestions = constants.questionTempltes.relativeKeyQuestions;

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
        const pos = circleWithEnharmonics.map(function (e) {
            return e.keyInfo.relMin;
        }).indexOf(keyToFind);
    }
    console.log(circleWithEnharmonics[pos]);
    console.log(pos);
    //const Q = Math.floor(Math.random() * 2); // zero or 1
    const Q = 0;
    let QUESTION = relativeKeyQuestions[quality][Q].replace(/\[key\]/g, keyToFind).replace(/\[quality\]/g, quality); // replace placeholder with the key
    console.log(relativeKeyQuestions[quality][Q]);
    console.log(QUESTION);
    ANSWER = Q === 0 ? circleWithEnharmonics[pos]['keyInfo']['relMaj'] : circleWithEnharmonics[pos]['keyInfo']['relMin'];

    QA.QUESTIONS.push(QUESTION);
    QA.ANSWERS.push(ANSWER);
    //console.log(QA.QUESTIONS);
    //console.log(QA.ANSWERS);
}