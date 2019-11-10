const util = require('../lambda/custom/utils');

var circleData = [
    {'key': 'c', 'relmin': 'a', 'data': ['f','g','0','0']},
    {'key': 'f', 'relmin': 'd', 'data': ['b flat','c','0','1']},
    {'key': 'b flat', 'relmin': 'g', 'data': ['e flat','f','0','2']},
    {'key': 'e flat', 'relmin': 'c', 'data': ['a flat','b flat','0','3']},
    {'key': 'a flat', 'relmin': 'f', 'data': ['d flat/c sharp','e flat','0','4']}, // enharmonics
    {'key': 'd flat', 'relmin': 'b flat/a sharp', 'data': ['f sharp/g flat','a flat','0','5']}, // enharmonics
    {'key': 'g flat', 'relmin': 'e flat/d sharp', 'data': ['b','d flat','0','6']}, // enharmonics
    //{'key': 'b', 'relmin': 'g sharp/a flat', 'data': ['e','g flat','5','0',]}, // enharmonics
    {'key': 'b', 'relmin': 'a flat', 'data': ['e','g flat','5','0',]}, // problem... relative major of a flat minor is b & c flat
    {'key': 'e', 'relmin': 'c sharp', 'data': ['a','b','4','0']}, // enharmonics
    {'key': 'a', 'relmin': 'f sharp', 'data': ['d','e','3','0']}, // enharmonics
    {'key': 'd', 'relmin': 'b', 'data': ['g','a','2','0']},
    {'key': 'g', 'relmin': 'e', 'data': ['c','d','1','0']},

    {'key': 'c sharp', 'relmin': 'b flat/a sharp', 'data': ['f sharp/g flat','a flat','7','0']},
    {'key': 'f sharp', 'relmin': 'e flat/d sharp', 'data': ['c flat/b','c sharp/d flat','6','0']},
    {'key': 'c flat', 'relmin:': 'g sharp/a flat', 'data': ['e','b/c flat','0','7']},

];


var drills = [
    drill01Keys = [
        {'interval': 'fifths', 'data': ['d flat/c sharp']},
        {'interval': 'fifths', 'data': ['b flat','f','c','g']},
        {'interval': 'fourths', 'data': ['d','g','c','f']},
        {'interval': 'fifths', 'data': ['c','f','b flat','e flat']},
    ],
    drill02Keys = [
        {'relative': 'minor', 'data': ['c']}, // what is the relative minor of this major
        {'relative': 'major', 'data': ['c']}, // what is the relative major of this minor
        {'relative': 'minor', 'data': ['e flat']}, // what is the relative minor of this major
        {'relative': 'major', 'data': ['g','f sharp','d','a flat']}, 
    ]
]

const attributes = {
    drill: 2,
    round: 4
};

var questionArray = [];
var QUESTIONS = [];
var ANSWERS = [];

var relQuestions_min = ['what is the relative minor of X major?'];
var relQuestions_maj = ['what is the relative major of X minor?'];

var roundData = drills[attributes.drill -1][attributes.round -1]; // drill/round
var roundArray = util.shuffleArray(roundData['data']); // the keys to be used in this round of questions
var relation = roundData['relative'];
var relMaj, relMin;

for (i = 0; i < roundArray.length; i++) {
    var keyToFind = roundArray[i];
    console.log('#' + roundArray[i]);
    if (roundArray[i].includes("/")) {
        keyToFind = roundArray[i].split('/')[(Math.floor(Math.random() * 2))];
    }
    //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
    if (relation === 'minor') {
        var pos = circleData.map(function(e) { 
            return e.key; 
        }).indexOf(keyToFind);
        console.log('relative ' + relation + ' of ' + keyToFind + ' major ' + ' is ' + circleData[pos]['relmin']);
        //relMin = circleData[pos]['relmin'];
        //relMaj = circleData[pos]['key'];
    } else {
        var pos = circleData.map(function(e) { 
            return e.relmin; 
        }).indexOf(keyToFind);
        console.log('keytofind=' + keyToFind + ' pos=' + pos);
        console.log('pos=' + pos + 'relative ' + relation + ' of ' + keyToFind + ' minor ' + ' is ' + circleData[pos]['key']);
        //relMaj = circleData[pos]['key'];
        //relMin = circleData[pos]['relmin'];
    }
    relMin = circleData[pos]['relmin'];
    relMaj = circleData[pos]['key'];
    console.log('##' + 'rel maj=' +  relMaj + ' rel min=' + relMin);
    var s = circleData[pos]['key'].split().concat(circleData[pos]['data'].concat(circleData[pos]['relmin']));
    console.log('####' + s);
    questionArray.push(s);

//console.log(circleData[i]['key']);
}

console.log(questionArray);

// Loop through the list of keys for this round and generate a question & answer for each one.
for (var i = 0; i < questionArray.length; i++) {
    //var Q = Math.floor(Math.random() * 2); // zero or 1
    console.log('###' + questionArray);
    var relativeMinor = questionArray[i][5]; // 6th element is relative minor
    var relativeMajor = questionArray[i][0]; // 1st element is major
    if (relation === 'minor') {
        var KEY = questionArray[i][0]; // first element is key
        console.log('minor');
        var QUESTION = relQuestions_min[0].replace("X", util.capitalizeAll(KEY)); // replace X with the key
        ANSWER = relativeMinor;
    } else if (relation === 'major') { // how the hell do we get the relative major from the minor?
        var KEY = questionArray[i][5]; // first element is key
        console.log('major');
        var QUESTION = relQuestions_maj[0].replace("X", util.capitalizeAll(KEY)); // replace X with the key
        ANSWER = relativeMajor;
    } else {
       console.log('ERROR'); //requires attention
    }
    QUESTIONS.push(QUESTION);
    ANSWERS.push(ANSWER);
    //keyQuestionArray.push(KEY); // used in askquestion function but there may be a better way
    console.log('QUESTION=' + QUESTION);
    console.log('ANSWER=' + ANSWER);

}

