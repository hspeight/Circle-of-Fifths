const util = require('../lambda/custom/utils');

// Key,4th,5th,sharps,flats,relative minor
var circleData = [
    ['c', 'f', 'g', '0', '0', 'a'],
    ['f', 'b flat', 'c', '0', '1', 'd'],
    ['b flat', 'e flat', 'f', '0', '2', 'g'],
    ['e flat', 'a flat', 'b flat', '0', '3', 'c'],
    ['a flat', 'd flat', 'e flat', '0', '4','f'],
    ['d flat', 'g flat', 'a flat', '0', '5', 'b flat'],
    ['c sharp', 'a flat', 'g flat or f sharp', '7', '0', 'a sharp'],
    ['g flat', 'b', 'd flat', '0', '6', 'e flat'],
    ['f sharp', 'b', 'd flat or c sharp', '6', '0', 'd sharp'],
    ['b', 'e', 'g flat', '5', '0', 'g sharp'],
    ['c flat', 'e', 'g flat or f sharp', '0', '7', 'a flat'] ,
    ['e', 'a', 'b', '4', '0', 'c sharp'],
    ['a', 'd', 'e', '3', '0', 'f sharp'],
    ['d', 'g', 'a', '2', '0', 'b'],
    ['g', 'c', 'd', '1', '0', 'e'],
];

var drill = [
    drill01Keys = [
        ['c', 'g', 'd', 'a'],   // drill 1, round 1 - fifths - (need to know 3 sharps)
        ['c', 'f', 'b flat', 'e flat'], // drill 1, round 2 - fourths - (need to know 3 flats)
        ['a flat', 'e flat', 'b flat', 'f', 'c', 'g', 'd', 'a'],    // drill 1, round 3 - fifths (need to know )
        ['e', 'a', 'd', 'g', 'c', 'f', 'b flat', 'e flat'],  // drill 1, round 4 - fourths 
        ['c', 'g', 'd', 'a', 'e', 'b', 'c flat', 'g flat', 'f sharp','d flat', 'c sharp', 'a flat', 'e flat', 'b flat', 'f']    // drill 1, round 4 - all keys including enharmonic
    ],
    drill02Keys = [
        ['x', 'y', 'z']
    ]

];

console.log(drill[1][1]);

//for (e = 0; e < circleData.length; e++) {

//}

//for (bb = 0; bb < drill01Keys.length; bb++) {
//        console.log(drill01Keys[bb]);
    
//}


//newArray = util.shuffleArray(circleData);

//console.log(newArray);

// if round = 1 sharp, create an array containing 