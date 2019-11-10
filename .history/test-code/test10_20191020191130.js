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

getAge('C MAJOR');


function getAge(user) {

    // Generate an array that only contains the user names
    var justUserNamesArray = circleWithEnharmonics.map(function (arrayItem) {
        return arrayItem.key;
    });

    console.log(justUserNamesArray);

    // Find the index in our generated array of our desired user name
    var indexOfClickedUserName = justUserNamesArray.indexOf(user);

    // Use that number to then get the appropriate user's age
    var userAge = circleWithEnharmonics[indexOfClickedUserName].relKey;

    console.log(userAge);
}