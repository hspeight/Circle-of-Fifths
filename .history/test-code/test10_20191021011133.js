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
        key: "relKey",
        data: [
          "C MAJOR", "F SHARP MINOR"
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
            QUESTION = relativeKeyQuestions[levelProp][Q].replace(/placeholder/g, nextKey); // replace placeholder with the key
            ANSWER = Q === 0 ? circleWithEnharmonics[indexOfKey]['major'] : circleWithEnharmonics[indexOfKey].intervals['minor'];
            break;
        case 'fourth':
        case 'fifth':
            QUESTION = intervalQuestions[levelProp][Q].replace(/placeholder/g, nextKey); // replace placeholder with the key
            ANSWER = Q === 0 ? circleWithEnharmonics[indexOfKey].intervals['fifth'] : circleWithEnharmonics[indexOfKey].intervals['fourth'];
            //console.log(ANSWER);
            break;
        case 'sharps':
        case 'flats':
            console.log(circleWithEnharmonics[indexOfKey].signature[levelProp]);   
            break;
        default:
            console.log('HWHAP');
    }



    QA.QUESTIONS.push(QUESTION);
    QA.ANSWERS.push(ANSWER);


    //return QA;

}
