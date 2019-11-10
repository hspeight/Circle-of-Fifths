const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

const attributes = {
    currentDrill: 1,
    currentlevel: 1,
    level: {
        key: "fourth",
        data: [
          "B MAJOR"
        ]
      },
  
}
const levelData = attributes.level.data;
let CWEProp = attributes.level.key;

var levelArray = util.shuffleArray(levelData);

//const quality = attributes.level.quality;

const circleWithEnharmonics = constants.circleWithEnharmonics;
const relativeKeyQuestions = constants.questionTempltes.relativeKeyQuestions;

let QA = {
    "QUESTIONS": [],
    "ANSWERS": [],
}

//Loop through array and extract the fulll details for each key
for (i = 0; i < levelArray.length; i++) {
    const keyToFind = levelArray[i];
    console.log(CWEProp);
    console.log(keyToFind);

    let R = 2;

    //if (quality === 'major') {
        //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
        pos = circleWithEnharmonics.map(function (e) {
            return R === 1 ? e.keyInfo['intervals'][CWEProp] : e.keyInfo[CWEProp];
        }).indexOf(keyToFind);
    //} else if (quality === 'minor') {
        //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
    //    pos = circleWithEnharmonics.map(function (e) {
    //        return e.keyInfo[quality];
    //    }).indexOf(keyToFind);
    //}
    console.log(pos);
    var sharps = circleWithEnharmonics[pos].keyInfo.signature.hasOwnProperty('sharps') ? circleWithEnharmonics[pos].keyInfo.signature.sharps : undefined;

    console.log(circleWithEnharmonics[pos]);

    console.log(pos);
    const Q = Math.floor(Math.random() * 2); // zero or 1
    //const Q = 0;

    /*
    let QUESTION = relativeKeyQuestions[quality][Q].replace(/\[key\]/g, keyToFind); // replace placeholder with the key
    console.log(relativeKeyQuestions[quality][Q]);
    console.log(QUESTION);
    ANSWER = quality === 'minor' ? circleWithEnharmonics[pos]['keyInfo']['relMin'] : circleWithEnharmonics[pos]['keyInfo']['relMaj'];

    QA.QUESTIONS.push(QUESTION);
    QA.ANSWERS.push(ANSWER);
    console.log(QA.QUESTIONS);
    console.log(QA.ANSWERS);
    */
}