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
        key: "sharps",
        data: [
          "C MAJOR", "F MAJOR"
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
var levelData = attributes.level.data;
var levelProp = attributes.level.key;
for (i = 0; i < levelData.length; i++) {
    const keyToFind = levelData[i];
    getAge(keyToFind);
}


function getAge(user) {

    // Generate an array that only contains the user names
    var justUserNamesArray = circleWithEnharmonics.map(function (arrayItem) {
        return arrayItem.key;
    });

    //console.log(justUserNamesArray);

    // Find the index in our generated array of our desired user name
    var indexOfClickedUserName = justUserNamesArray.indexOf(user);

    switch (levelProp) {
        case 'relKey':
            console.log(circleWithEnharmonics[indexOfClickedUserName][levelProp]);
            break;
        case 'fourth':
        case 'fifth':
            console.log(circleWithEnharmonics[indexOfClickedUserName].intervals[levelProp]);
            break;
        case 'sharps':
        case 'flats':
            console.log(circleWithEnharmonics[indexOfClickedUserName].signature[levelProp]);   
            break;
        default:
            console.log('HWHAP');
    }

}