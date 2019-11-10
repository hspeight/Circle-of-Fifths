// test code for perfect intervals

const util = require('../lambda/custom/utils');

var circleWithEnharmonics = [
    {
        keyInfo: { //c major
            relMaj: 'c',
            relMin: 'a',
            intervals: {
                fourth: 'f',
                fifth: 'g',
                //minor_4th: 'd',
                //minor_5th: 'e',
            },
            //flats: 0,
            //sharps: 0,
        },
    },
    {
        keyInfo: { //f major
            relMaj: 'f',
            relMin: 'd',
            intervals: {
                fourth: 'b flat',
                fifth: 'c',
            },
            flats: 1,
        },
    },
    {
        keyInfo: { //b flat major
            relMaj: 'b flat',
            relMin: 'g',
            intervals: {
                fourth: 'e flat',
                fifth: 'f',
            },
            flats: 2,
            OOF: 1, // position in order of flats
        },
    },
    {
        keyInfo: { //e flat major
            relMaj: 'e flat',
            relMin: 'c',
            intervals: {
                fourth: 'a flat',
                fifth: 'b flat',
            },
            flats: 3,
            OOF: 2, // position in order of flats
        },
    },
    {
        keyInfo: { //a flat major
            relMaj: 'a flat',
            relMin: 'f',
            intervals: {
                fourth: 'd flat',
                fifth: 'e flat',
            },
            flats: 4,
            OOF: 3, // position in order of flats
        },
    },
    {
        keyInfo: { //d flat major
            relMaj: 'd flat',
            relMin: 'b flat/a sharp',
            intervals: {
                fourth: 'g flat/f sharp',
                fifth: 'a flat',
            },
            flats: 5,
            OOF: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //c sharp major
            relMaj: 'c sharp',          // also serves as the note name in order of sharps drill
            relMin: 'b flat/a sharp',
            intervals: {
                fourth: 'g flat/f sharp',
                fifth: 'a flat',
            },
            sharps: 7,
            OOS: 2, // position in order of sharps
        },
    },
    {
        keyInfo: { //g flat major
            relMaj: 'g flat',           // also serves as the note name in order of flats drill
            relMin: 'e flat/d sharp',
            intervals: {
                fourth: 'g flat',
                fifth: 'a flat',
            },
            flats: 5,
            OOF: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //f sharp major
            relMaj: 'f sharp',           // also serves as the note name in order of sharps drill
            relMin: 'd sharp/e flat',
            intervals: {
                fourth: 'g flat',
                fifth: 'a flat',
            },
            sharps: 6,
            OOS: 1, // position in order of flats
        },
    },
    {
        keyInfo: { //b major
            relMaj: 'b',           // also serves as the note name in order of sharps drill
            relMin: 'g sharp/a flat',
            intervals: {
                fourth: 'e',
                fifth: 'g flat/f sharp',
            },
            sharps: 5,
            OOS: 7, // position in order of flats
        },
    },
    {
        keyInfo: { //c flat major
            relMaj: 'c flat',           // also serves as the note name in order of flats drill
            relMin: 'g sharp/a flat',
            intervals: {
                fourth: 'e',
                fifth: 'g flat/f sharp',
            },
            flats: 7,
            OOF: 6, // position in order of flats
        },
    },
    {
        keyInfo: { //e major
            relMaj: 'e',           // also serves as the note name in order of sharps drill
            relMin: 'c sharp',
            intervals: {
                fourth: 'a',
                fifth: 'b/c flat',
            },
            sharps: 4,
            OOS: 6, // position in order of flats
        },
    },
    {
        keyInfo: { //a major
            relMaj: 'a',           // also serves as the note name in order of sharps drill
            relMin: 'f sharp',
            intervals: {
                fourth: 'd',
                fifth: 'e',
            },
            sharps: 3,
            OOS: 5, // position in order of flats
        },
    },
    {
        keyInfo: { //d major
            relMaj: 'd',           // also serves as the note name in order of sharps drill
            relMin: 'b',
            intervals: {
                fourth: 'g',
                fifth: 'a',
            },
            sharps: 2,
            OOS: 4, // position in order of flats
        },
    },
    {
        keyInfo: { //g major
            relMaj: 'g',           // also serves as the note name in order of sharps drill
            relMin: 'e',
            intervals: {
                fourth: 'c',
                fifth: 'd',
            },
            sharps: 1,
            OOS: 3, // position in order of flats
        },
    },
    {
        keyInfo: { //b flat minor
            relMin: 'b flat',
            relMaj: 'd flat/c sharp',
            intervals: {
                minor_4th: 'd sharp/e flat',
                minor_5th: 'f',
            },
            flats: 5,
        },
    },
    {
        keyInfo: { //a sharp minor
            relMin: 'a sharp',
            relMaj: 'd flat/c sharp',
            intervals: {
                minor_4th: 'd sharp/e flat',
                minor_5th: 'f',
            },
            sharps: 7,
        },
    },
    {
        keyInfo: { //d sharp minor
            relMin: 'd sharp',
            relMaj: 'g flat/f sharp',
            intervals: {
                minor_4th: 'g sharp/a flat',
                minor_5th: 'b flat/a sharp',
            },
            sharps: 6,
        },
    },
    {
        keyInfo: { //e flat minor
            relMin: 'e flat',
            relMaj: 'g flat/f sharp',
            intervals: {
                minor_4th: 'g sharp/a flat',
                minor_5th: 'b flat/a sharp',
            },
            flats: 6,
        },
    },
    {
        keyInfo: { //g sharp minor
            relMin: 'g sharp',
            relMaj: 'b/c flat',
            intervals: {
                minor_4th: 'c sharp',
                minor_5th: 'd sharp/e flat',
            },
            sharps: 5,
        },
    },
    {
        keyInfo: { //a flat
            relMin: 'a flat',
            relMaj: 'b/c flat',
            intervals: {
                minor_4th: 'c sharp',
                minor_5th: 'd sharp/e flat',
            },
            flats: 7,
        },
    },
]

var drills = [
    perfectIntervals = [
        {'interval': 'fifths', 'data': ['e']},
        {'interval': 'fourths', 'data': ['d flat']},
        {'interval': 'fifths', 'data': ['b flat','f','c','g']},
        {'interval': 'fourths', 'data': ['d','g','c','f']},
        {'interval': 'fifths', 'data': ['c','f','b flat','e flat']},
    ],
    relativeKeys = [
        {'relative': 'minor', 'data': ['c','f','b flat','e flat','a flat','d flat','c sharp','g flat','f sharp','c flat','b','e','a','d','g']}, // what is the relative major of this minor
        {'relative': 'major', 'data': ['c','f','b flat','a sharp','d sharp','e flat','g sharp','a flat','c sharp','f sharp','b','e','a','d','g']}, // what is the relative major of this minor
        {'relative': 'minor', 'data': ['c','f','b flat','e flat','a flat','d flat','c sharp','g flat','f sharp','c flat','b','e','a','d','g']}, // what is the relative major of this minor
        {'relative': 'minor', 'data': ['c','a','d']}, // what is the relative minor of this major
        {'relative': 'major', 'data': ['c', 'a', 'd']}, 
        {'relative': 'major', 'data': ['c']},
        {'relative': 'minor', 'data': ['e flat']},
        {'relative': 'major', 'data': ['g','f sharp','d','a flat']},
        {'relative': 'major', 'data': ['a flat','a']},
        {'relative': 'major', 'data': ['g sharp','a']}, 
        {'relative': 'minor', 'data': ['c flat','a']}, 
        {'relative': 'minor', 'data': ['b','a']}, 
    ],
    keySignatures = [

    ],
]

const attributes = {
    drill: 1,
    round: 5
};

var QUESTIONS = [];
var ANSWERS = [];

var intervalQuestions = new Array();
// Do not change the order of the interval questions. They must be this way round to work peoperly.
intervalQuestions['fourths'] = ['what is placeholder the fourth of ?', 'what is the fourth of placeholder ?'];
intervalQuestions['fifths'] = ['what is the fifth of placeholder ?', 'what is placeholder the fifth of ?'];

//console.log(intervalQuestions['fourths']);

//var pos = circleWithEnharmonics.map(function(e) { 
//   return e.key.flats; 
//}).indexOf(7);
//console.log(pos);
//console.log(circleWithEnharmonics[pos]['key']);

var roundData = drills[attributes.drill -1][attributes.round -1]; // drill/round
//var roundArray = util.shuffleArray(roundData['data']); // the keys to be used in this round of questions
var roundArray = roundData['data'];
var interval = roundData['interval'];

for (i = 0; i < roundArray.length; i++) {
    var keyToFind = roundArray[i];
    //console.log('#' + roundArray[i] + '/' + roundArray.length);
    
    //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
    //if (interval === 'fourths') {
        var pos = circleWithEnharmonics.map(function(e) {
            return e.keyInfo.relMaj;
        }).indexOf(keyToFind);
        //console.log(keyToFind + ' / ' + pos);
        //p = 1;
        //console.log(intervalQuestions[interval] + 'Q=' + Q);
        var Q = Math.floor(Math.random() * 2); // zero or 1
        QUESTION = intervalQuestions[interval][Q].replace(/placeholder/g, keyToFind); // replace X with the key
        ANSWER = Q == 0 ? circleWithEnharmonics[pos]['keyInfo']['intervals']['fifth'] : circleWithEnharmonics[pos]['keyInfo']['intervals']['fourth'];
  
    QUESTIONS.push(QUESTION);
    ANSWERS.push(ANSWER);
    //console.log('##' + 'rel maj=' +  relMaj + ' rel min=' + relMin);

}

console.log(QUESTIONS);
console.log(ANSWERS);
