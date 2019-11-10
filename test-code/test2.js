const util = require('../lambda/custom/utils');

// Key,4th,5th,sharps,flats,relative minor ******** include paralel minor? **********
// parallel minor starts on same pitch but has a different key signature

var circleData = [
    {'key': 'c', 'data': ['f','g','0','0','a']},
    {'key': 'f', 'data': ['b flat','c','0','1','d']},
    {'key': 'b flat', 'data': ['e flat','f','0','2','g']},
    {'key': 'e flat', 'data': ['a flat','b flat','0','3','c']},
    {'key': 'a flat', 'data': ['d flat/c sharp','e flat','0','4','f']}, // enharmonics
    {'key': 'd flat', 'data': ['f sharp/g flat','a flat','0','5','b flat']}, // enharmonics
    {'key': 'g flat', 'data': ['b','d flat','0','6','e flat']}, // enharmonics
    {'key': 'b', 'data': ['e','g flat','5','0','g sharp']}, // enharmonics
    {'key': 'e', 'data': ['a','b','4','0','c flat']}, // enharmonics
    {'key': 'a', 'data': ['d','e','3','0','f sharp']}, // enharmonics
    {'key': 'd', 'data': ['g','a','2','0','b']},
    {'key': 'g', 'data': ['c','d','1','0','e']},

    {'key': 'c sharp', 'data': ['f sharp/g flat','a flat','7','0','b flat/a sharp']},
    {'key': 'f sharp', 'data': ['c flat/b','c sharp/d flat','6','0','d sharp/e flat']},
    {'key': 'c flat', 'data': ['e','b/c flat','0','7','g sharp/a flat']},

];

var drills = [
    drill01Keys = [
        {'interval': 'fifths', 'data': ['d flat/c sharp']},
        {'interval': 'fifths', 'data': ['b flat','f','c','g']},
        {'interval': 'fourths', 'data': ['d','g','c','f']},
        {'interval': 'fifths', 'data': ['c','f','b flat','e flat']},
    ],
    drill02Keys = [
        {'interval': 'fourths', 'data': ['a','b','c','g']},
    ]
    /*
    drill01Keys = [
        ['b flat', 'f', 'c', 'g','5ths'],   // drill 1, round 1 - fifths - (need to know ? sharps)
        ['d', 'g', 'c', 'f','4ths'],   // drill 1, round 2 - fourths - (need to know ? flats)
       ['c', 'f', 'b flat', 'e flat','5ths'], // drill 1, round 2 - fourths - (need to know 3 flats)
        //['a flat', 'e flat', 'b flat', 'f', 'c', 'g', 'd', 'a'],    // drill 1, round 3 - fifths (need to know )
        //['e', 'a', 'd', 'g', 'c', 'f', 'b flat', 'e flat'],  // drill 1, round 4 - fourths 
        //['c', 'g', 'd', 'a', 'e', 'b', 'c flat', 'g flat', 'f sharp','d flat', 'c sharp', 'a flat', 'e flat', 'b flat', 'f']    // drill 1, round 4 - all keys including enharmonic
    ],
    drill02Keys = [
        ['a', 'b', 'd', 'c','x','y','z','7ths'], // drill 1, round 2 - fourths - (need to know 3 flats)
    ]
    */
];

const attributes = {
    drill: 1,
    round: 1
};
var relQuestions4th = ['what is the fourth of X?', 'what is X the fourth of?'];
var relQuestions5th = ['what is the fifth of X?', 'what is X the fifth of?'];

var roundData = drills[attributes.drill -1][attributes.round -1]; // drill/round
var roundArray = util.shuffleArray(roundData['data']); // the keys to be used in this round of questions

/*
console.log('>>>>>>>>>>>>>>>>>' + roundArray);
for (var i = 0; i < roundArray.length; i++) {
    console.log(roundArray);
    if (roundArray[i].includes("/")) {
        var enharmonic = roundArray[i].split('/')[(Math.floor(Math.random() * 2))];
        //var x = enharmonic[(Math.floor(Math.random() * 2))];
        console.log('enharmonic=' + enharmonic);
    console.log('-' + roundArray[i]);
    }
}
console.log('>>>>>>>>>>>>>>>>>' + roundArray);
*/

var interval = roundData['interval'];   // interval
var questionArray = [];
var answerArray = [];
var QUESTIONS = [];
var ANSWERS = [];

//console.log(Object.keys(circleData));
for (i = 0; i < roundArray.length; i++) {
    var keyToFind = roundArray[i];
    if (roundArray[i].includes("/")) {
        keyToFind = roundArray[i].split('/')[(Math.floor(Math.random() * 2))];
    }
    //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
    var pos = circleData.map(function(e) { 
        return e.key; 
    }).indexOf(keyToFind);  
    //var k =  circleData[pos]['key'].toString();
    //var d = circleData[pos]['data'];
    //questionArray.push(circleData[pos]['key'] + circleData[pos]['data']);
    //var s = circleData[pos]['data'];
    var s = circleData[pos]['key'].split().concat(circleData[pos]['data']);
    questionArray.push(s);

//console.log(circleData[i]['key']);
}

// Loop through the list of keys for this round and generate a question & answer for each one.
for (var i = 0; i < questionArray.length; i++) {
    var Q = Math.floor(Math.random() * 2); // zero or 1
    //console.log('Q=' + Q);
    var KEY = questionArray[i][0]; // first element is key
    var fourth = questionArray[i][1]; // 2nd element
    var fifth = questionArray[i][2]; // 3rd element
    console.log('KEY=' + KEY);
    if (interval === 'fourths') {
        console.log('fourths');
        var QUESTION = relQuestions4th[Q].replace("X", util.capitalizeAll(KEY)); // replace X with the key
        ANSWER = Q == 0 ? fourth : fifth; 
    } else if (interval === 'fifths') {
        console.log('fifths');
        var QUESTION = relQuestions5th[Q].replace("X", util.capitalizeAll(KEY)); // replace X with the key
        ANSWER = Q == 0 ? fifth : fourth;
    } else {
       console.log('ERROR'); //requires attention
    }
    QUESTIONS.push(QUESTION);
    ANSWERS.push(ANSWER);
    //keyQuestionArray.push(KEY); // used in askquestion function but there may be a better way
    console.log('QUESTION=' + QUESTION);
    console.log('ANSWER=' + ANSWER);

}

console.log('QUESTIONARRAY=' + JSON.stringify(QUESTIONS));
console.log('ANSWERARRAY=' + JSON.stringify(ANSWERS));
console.log(drills[attributes.drill -1][attributes.round -1]['data'].length);

console.log('>' + isTheAnswerCorrect('g flat', 'g flat'));
console.log('drill length=' + drills[attributes.drill -1].length);

function isTheAnswerCorrect(correctAnswer, utteredAnswer) {
    var enharmonic = correctAnswer.split('/');

    return enharmonic.includes(utteredAnswer) ? true : false;
}
