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

for (bb = 0; bb < circleData.length; bb++) {
    if (circleData[bb][3] < 4) {
        console.log(circleData[bb]);
    }
}


//newArray = util.shuffleArray(circleData);

//console.log(newArray);

// if round = 1 sharp, create an array containing 