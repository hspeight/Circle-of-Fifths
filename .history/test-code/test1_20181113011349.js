var util = require('../lambda/custom/utils');
var asset = require('../lambda/custom/assets');

var circleKeys = [
    ['c', 'f', 'g', '0', '0', 'a'],
    //['f', 'b flat', 'c', '0', '1', 'd'],
    //['b flat', 'e flat', 'f', '0', '2', 'g'],
    //['e flat', 'a flat', 'b flat', '0', '3', 'c'],
    //['a flat', 'c sharp/d flat', 'e flat', '0', '4','f'],
    //['d flat', 'g flat/f sharp', 'a flat', '0', '5', 'b flat'],
    //['g flat', 'b', 'd flat', '0', '6', 'e flat'],
    //['b', 'e', 'f sharp/g flat', '5', '0', 'g sharp'],
    //['e', 'a', 'b/c flat', '4', '0', 'c sharp'],
    //['a', 'd', 'e', '3', '0', 'f sharp'],
    //['d', 'g', 'a', '2', '0', 'b'],
    //['g', 'c', 'd', '1', '0', 'e'],
    //['c sharp', 'g flat/f sharp', 'a flat', '7', '0', 'a sharp'],
    //['f sharp', 'b/c flat', 'd flat/c sharp', '6', '0', 'd sharp'],
    //['c flat', 'e', 'g flat/f sharp', '0', '7', 'a flat'] ,
];

var circleKeys2 = util.pickEnharnomics(circleKeys);

console.log(circleKeys2);