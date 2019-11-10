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
        key: "fifth",
        data: [
          "C MAJOR"
        ]
      },
  
}

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

for (i = 0; i < attributes.level.data; i++) {
    const keyToFind = levelArray[i];
    getAge(keyToFind);
}


function getAge(user) {

    // Generate an array that only contains the user names
    var justUserNamesArray = circleWithEnharmonics.map(function (arrayItem) {
        return arrayItem.key;
    });

    console.log(justUserNamesArray);

    // Find the index in our generated array of our desired user name
    var indexOfClickedUserName = justUserNamesArray.indexOf(user);

    // Use that number to then get the appropriate user's age
    var userAge = circleWithEnharmonics[indexOfClickedUserName].intervals['fourth'];

    console.log(userAge);
}