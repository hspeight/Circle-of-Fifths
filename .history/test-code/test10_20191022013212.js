const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;
/*
var mainArray = [{
    name: "Bob",
    age: 23
}, {
    name: "Sue",
    age: 28
}];
*/

const attributes = {
    currentDrill: 1,
    currentlevel: 1,
    level: {
        key: "sig",
        data: [
          //"F MAJOR", "B FLAT MAJOR", "G MAJOR"
          "A MINOR", "G MAJOR", "D MINOR", "C MAJOR", "B FLAT MAJOR"
        ]
      },
  
}
/*
const circleWithEnharmonics = [{
        key: 'C MAJOR',
        relKey: 'A MINOR',
        intervals: {
            fourth: 'F MAJOR',
            fifth: 'G MAJOR'
        },
        signature: {
            sharps: 0,
            flats: 0
        }
    },
    {
        key: 'D MINOR',
        relKey: 'F MAJOR',
        intervals: {
            fourth: 'G MINOR',
            fifth: 'A MINOR'
        },
        signature: {
            sharps: 0,
            flats: 1
        }

    },
]
*/
const circleWithEnharmonics = constants.circleWithEnharmonics;
const intervalQuestions = constants.questionTempltes.intervalQuestions;
const relativeKeyQuestions = constants.questionTempltes.relativeKeyQuestions;
const keySignatureQuestions = constants.questionTempltes.keySignatureQuestions;

var levelData = attributes.level.data;
var levelProp = attributes.level.key;

let QA = {
    "QUESTIONS": [],
    "ANSWERS": [],
}

for (i = 0; i < levelData.length; i++) {
    const keyToFind = levelData[i];
    getAnswer(keyToFind);
}


console.log(QA);


function getAnswer(nextKey) {

    // Generate an array that only contains the user names
    var justKeyNamesArray = circleWithEnharmonics.map(function (arrayItem) {
        return arrayItem.key;
    });

    var indexOfKey = justKeyNamesArray.indexOf(nextKey);

    //let Q = 0;
    let Q = Math.floor(Math.random() * 2); // zero or 1 - use length isntead of 2?

    //let QUESTION = '';

    switch (levelProp) {
        case 'relKey':
            quality = circleWithEnharmonics[indexOfKey]['quality'];
            QUESTION = relativeKeyQuestions[quality][Q].replace(/\[key\]/g, nextKey); // replace placeholder with the key
            ANSWER =  circleWithEnharmonics[indexOfKey][levelProp];
            break;
        case 'fourth':
        case 'fifth':
            QUESTION = intervalQuestions[levelProp][Q].replace(/placeholder/g, nextKey); // replace placeholder with the key
            ANSWER = Q === 0 ? circleWithEnharmonics[indexOfKey].intervals['fifth'] : circleWithEnharmonics[indexOfKey].intervals['fourth'];
            //console.log(ANSWER);
            break;
        case 'sig':
            // get the quality of the key i.e. major or minor
            keyQuality = nextKey.split(" ").slice(-1);
            // get the number of sharps or flats this contains
            sharps = circleWithEnharmonics[indexOfKey]['signature']['sharps'];
            flats = circleWithEnharmonics[indexOfKey]['signature']['flats'];
            // one of the above will be undefined so get the vlaue we actually need
            num = sharps === undefined ? flats : sharps;
            // get correct text to speak
            sign = flats !== undefined ? flats === 1 && Q === 0 ? 'flat' : 'flats' : sharps === 1 && Q === 0 ? 'sharp' : 'sharps';
            // set up the question & answer
            QUESTION = Q === 0 ? keySignatureQuestions['X'][Q].replace(/\[quality\]/g, keyQuality).replace(/\[number\]/g, num).replace(/\[sign\]/g, sign) :
                             keySignatureQuestions['X'][Q].replace(/\[key\]/g, circleWithEnharmonics[indexOfKey]['key']).replace(/\[sign\]/g, sign);
            // hard code the question for c major and a minor
            if (Q === 0 && (nextKey === 'C MAJOR' || nextKey === 'A MINOR')) {
                QUESTION = 'Which ' + keyQuality + ' key has 0 sharps and 0 flats?';
            }
            ANSWER = Q === 0 ? circleWithEnharmonics[indexOfKey]['key'] : num;
            break;
        default:
            console.log('HWHAP');
    }

    QA.QUESTIONS.push(QUESTION);
    QA.ANSWERS.push(ANSWER);


    //return QA;

}
