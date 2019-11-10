const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

var mainArray = [{
    name: "Bob",
    age: 23
}, {
    name: "Sue",
    age: 28
}];

getAge('Bob');


function getAge(user) {

    // Generate an array that only contains the user names
    var justUserNamesArray = mainArray.map(function (arrayItem) {
        return arrayItem.name;
    });

    // Find the index in our generated array of our desired user name
    var indexOfClickedUserName = justUserNamesArray.indexOf(user);

    // Use that number to then get the appropriate user's age
    var userAge = mainArray[indexOfClickedUserName].age;

    console.log(userAge);
}