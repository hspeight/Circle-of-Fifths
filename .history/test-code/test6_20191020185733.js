const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

const attributes = {
    currentDrill: 1,
    currentlevel: 1,
    level: {
        key: "fifth",
        data: [
          "C MAJOR"
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

var justKeysArray = circleWithEnharmonics.map(function (arrayItem) {
    return arrayItem.keyInfo;
});
console.log(justKeysArray);


//Loop through array and extract the fulll details for each key
for (i = 0; i < levelArray.length; i++) {
    const keyToFind = levelArray[i];
    console.log(CWEProp);
    console.log(keyToFind);

    

    var indexOfKey = justKeysArray.indexOf('C MAJOR');
    console.log('indx=' + indexOfKey);
    console.log('indx=' + indexOfKey);

    //if (quality === 'major') {
        //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
        /*
        pos = circleWithEnharmonics.map(function (e) {
            switch (CWEProp) {
                case 'relMaj':
                case 'relMin':
                    return e.keyInfo[CWEProp];
                case 'fourth':
                case 'fifth':
                    return e.keyInfo.intervals['fifth'];
                default:
                    return null;
            }
            //return R === 1 ? e.keyInfo['intervals'][CWEProp] : e.keyInfo[CWEProp];
        }).indexOf('C MAJOR');
        */
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

    console.log(relativeKeyQuestions);
    
    let QUESTION = relativeKeyQuestions[quality][Q].replace(/\[key\]/g, keyToFind); // replace placeholder with the key
    console.log(relativeKeyQuestions[quality][Q]);
    console.log(QUESTION);
    ANSWER = quality === 'minor' ? circleWithEnharmonics[pos]['keyInfo']['relMin'] : circleWithEnharmonics[pos]['keyInfo']['relMaj'];

    QA.QUESTIONS.push(QUESTION);
    QA.ANSWERS.push(ANSWER);
    console.log(QA.QUESTIONS);
    console.log(QA.ANSWERS);
    
}