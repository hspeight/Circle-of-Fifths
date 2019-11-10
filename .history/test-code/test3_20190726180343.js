const util = require('../lambda/custom/utils');

var circleData = [
    {'key': 'b', 'relmaj': 'b/c flat', 'relmin': 'g sharp/a flat', 'data': ['e','g flat','5','0',]}, // problem... relative major of a flat minor is b & c flat
    /*
    {'key': 'c', 'relmaj': 'c', 'relmin': 'a', 'data': ['f','g','0','0']},
    {'key': 'f', 'relmaj': 'f', 'relmin': 'd', 'data': ['b flat','c','0','1']},
    {'key': 'b flat', 'relmaj': 'b flat', 'relmin': 'g', 'data': ['e flat','f','0','2']},
    {'key': 'e flat', 'relmaj': 'e flat', 'relmin': 'c', 'data': ['a flat','b flat','0','3']},
    {'key': 'a flat', 'relmaj': 'a flat', 'relmin': 'f', 'data': ['d flat/c sharp','e flat','0','4']}, // enharmonics
    {'key': 'd flat', 'relmaj': 'd flat/c sharp', 'relmin': 'b flat/a sharp', 'data': ['f sharp/g flat','a flat','0','5']}, // enharmonics
    {'key': 'g flat', 'relmaj': 'g flat/f sharp', 'relmin': 'e flat/d sharp', 'data': ['b','d flat','0','6']}, // enharmonics
    //{'key': 'b', 'relmin': 'g sharp/a flat', 'data': ['e','g flat','5','0',]}, // enharmonics
    {'key': 'b', 'relmaj': 'b/c flat', 'relmin': 'g sharp/a flat', 'data': ['e','g flat','5','0',]}, // problem... relative major of a flat minor is b & c flat
    {'key': 'e', 'relmaj': 'e', 'relmin': 'c sharp', 'data': ['a','b','4','0']}, // enharmonics
    {'key': 'a', 'relmaj': 'a', 'relmin': 'f sharp', 'data': ['d','e','3','0']}, // enharmonics
    {'key': 'd', 'relmaj': 'd', 'relmin': 'b', 'data': ['g','a','2','0']},
    {'key': 'g', 'relmaj': 'g', 'relmin': 'e', 'data': ['c','d','1','0']},

    {'key': 'c sharp', 'relmaj': 'c sharp/d flat', 'relmin': 'b flat/a sharp', 'data': ['f sharp/g flat','a flat','7','0']},
    {'key': 'f sharp', 'relmaj': 'f sharp/g flat', 'relmin': 'e flat/d sharp', 'data': ['c flat/b','c sharp/d flat','6','0']},
    {'key': 'c flat', 'relmaj': 'c flat/b', 'relmin:': 'a flat', 'data': ['e','b/c flat','0','7']},
    {'key': 'c flat', 'relmaj': 'c flat/b', 'relmin:': 'g sharp', 'data': ['e','b/c flat','0','7']},
    */
];

var circleWithEnharmonics = [
    {'relMin': 'a', 'relMaj': 'c'},
    {'relMin': 'a flat', 'relMaj': 'b/c flat'},
    {'relMin': 'd', 'relMaj': 'f'},
    {'relMin': 'c', 'relMaj': 'e flat'},
    {'relMin': 'g', 'relMaj': 'b flat'},
    {'relMin': 'f sharp', 'relMaj': 'a'},
    {'relMin': 'b', 'relMaj': 'd'},
    {'relMin': 'g sharp', 'relMaj': 'b/c flat'},
    {'relMin': 'a flat/g sharp', 'relMaj': 'c flat'},

]

var drills = [
    drill01Keys = [
        {'interval': 'fifths', 'data': ['d flat/c sharp']},
        {'interval': 'fifths', 'data': ['b flat','f','c','g']},
        {'interval': 'fourths', 'data': ['d','g','c','f']},
        {'interval': 'fifths', 'data': ['c','f','b flat','e flat']},
    ],
    drill02Keys = [
        {'relative': 'major', 'data': ['a']}, // what is the relative major of this minor
        {'relative': 'minor', 'data': ['c','a','d']}, // what is the relative minor of this major
        {'relative': 'major', 'data': ['c', 'a', 'd']}, 
        {'relative': 'major', 'data': ['c']},
        {'relative': 'minor', 'data': ['e flat']},
        {'relative': 'major', 'data': ['g','f sharp','d','a flat']},
        {'relative': 'major', 'data': ['a flat','a']},
        {'relative': 'major', 'data': ['g sharp','a']}, 
        {'relative': 'minor', 'data': ['c flat','a']}, 
        {'relative': 'minor', 'data': ['b','a']}, 

    ]
]

const attributes = {
    drill: 2,
    round: 9
};

var questionArray = [];
var QUESTIONS = [];
var ANSWERS = [];

var relQuestions = [
    relQuestions_maj = 'what is the relative major of X minor?',
    relQuestions_min = 'what is the relative minor of X major?',
];

var roundData = drills[attributes.drill -1][attributes.round -1]; // drill/round
var roundArray = util.shuffleArray(roundData['data']); // the keys to be used in this round of questions
var relation = roundData['relative'];
var relMaj, relMin, p;

for (i = 0; i < roundArray.length; i++) {
    var keyToFind = roundArray[i];
    //console.log('#' + roundArray[i] + '/' + roundArray.length);
    if (roundArray[i].includes("/")) {
        keyToFind = roundArray[i].split('/')[(Math.floor(Math.random() * 2))];
    }
    //https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
    if (relation === 'minor') {
        var pos = circleWithEnharmonics.map(function(e) { 
            return e.relMaj; 
        }).indexOf(keyToFind);
        p = 1;
        //console.log('pos=' + pos + ' relative ' + relation + ' of ' + keyToFind + ' major is ' + circleWithEnharmonics[pos]['relMin']);

    } else {
        //console.log('>' + keyToFind);

        var pos = circleWithEnharmonics.map(function(e) {
            return e.relMin; 
        }).indexOf(keyToFind);
        p = 0;
        //console.log('keytofind=' + keyToFind);
        //console.log('pos=' + pos + ' relative ' + relation + ' of ' + keyToFind + ' minor is ' + circleWithEnharmonics[pos]['relMaj']);

    }
    //console.log(p);
    relMin = circleWithEnharmonics[pos]['relMin'];
    relMaj = circleWithEnharmonics[pos]['relMaj'];
    var QUESTION = relQuestions[p].replace("X", p == 0 ? relMin : relMaj); // replace X with the key
    var ANSWER  = p == 1 ? relMin : relMaj;
    QUESTIONS.push(QUESTION);
    ANSWERS.push(ANSWER);
    //console.log('##' + 'rel maj=' +  relMaj + ' rel min=' + relMin);

}

console.log(QUESTIONS);
console.log(ANSWERS);
