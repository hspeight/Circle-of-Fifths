// test code for relative majors

const util = require('../lambda/custom/utils');
const constants = require('../lambda/custom/constants');

const states = constants.states;
const circleWithEnharmonics = constants.circleWithEnharmonics;
const languageStrings = constants.languageStrings;
const drills = constants.drills;
const pronounce = constants.pronounce;

const attributes = {
    drill: 1,
    level: 1
};
var QUESTIONS = [];
var ANSWERS = [];

var relQuestions = [
    relQuestions_maj = 'what is the relative major of X minor?',
    relQuestions_min = 'what is the relative minor of X major?',
];
var intervalQuestions = new Array();
// Note: Do not change the order of the interval questions. They must be this way round to work peoperly.
intervalQuestions['fourths'] = ['what is placeholder the fourth of ?', 'what is the fourth of placeholder ?'];
intervalQuestions['fifths'] = ['what is the fifth of placeholder ?', 'what is placeholder the fifth of ?'];

//var pos = circleWithEnharmonics.map(function(e) { 
//   return e.key.flats; 
//}).indexOf(7);
//console.log(pos);
//console.log(circleWithEnharmonics[pos]['key']);
console.log(drills[attributes.drill -1]['packName']);
var roundData = drills[attributes.drill -1]['levels'][attributes.level -1]; // drill/
console.log(roundData);
var roundArray = util.shuffleArray(roundData['data']);
var relation = roundData['relative'];
var relMaj, relMin, p;

for (i = 0; i < roundArray.length; i++) {
    var keyToFind = roundArray[i];
    //console.log('#' + roundArray[i] + '/' + roundArray.length);
    //if (roundArray[i].includes("/")) {
    //    keyToFind = roundArray[i].split('/')[(Math.floor(Math.random() * 2))];
    //}
    //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
    if (relation === 'minor') {
        var pos = circleWithEnharmonics.map(function(e) { 
            return e.keyInfo.relMaj; 
        }).indexOf(keyToFind);
        console.log(keyToFind + ' / ' + pos);
        p = 1;
    } else {
        console.log('>' + keyToFind);

        var pos = circleWithEnharmonics.map(function(e) {
            return e.keyInfo.relMin;
        }).indexOf(keyToFind);
        p = 0;
    }
    relMaj = circleWithEnharmonics[pos]['keyInfo']['relMaj'];
    relMin = circleWithEnharmonics[pos]['keyInfo']['relMin'];
    var QUESTION = relQuestions[p].replace("X", p == 0 ? relMin : relMaj); // replace X with the key
    var ANSWER  = p == 1 ? relMin : relMaj;
    QUESTIONS.push(QUESTION);
    ANSWERS.push(ANSWER);
    //console.log('##' + 'rel maj=' +  relMaj + ' rel min=' + relMin);

}

console.log(QUESTIONS);
console.log(ANSWERS);


for (let key in pronounce) {
    console.log(key + ' - ' + pronounce[key]);
  }

  QUESTION = intervalQuestions['fifths'][0].replace(/placeholder/g, keyToFind in pronounce ? pronounce[keyToFind] : keyToFind);
  console.log(drills[0]);
  if (drills[0]) {
      console.log(true);
  }
  //console.log('a' in pronounce);
