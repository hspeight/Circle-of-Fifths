var util = require('../lambda/custom/utils');
var asset = require('../lambda/custom/assets');

var circleKeys = [
    //['c', 'f', 'g', '0', '0', 'a'],
    //['f', 'b flat', 'c', '0', '1', 'd'],
    //['b flat', 'e flat', 'f', '0', '2', 'g'],
    //['e flat', 'a flat', 'b flat', '0', '3', 'c'],
    //['a', 'd', 'e', '3', '0', 'f sharp'],
    //['d', 'g', 'a', '2', '0', 'b'],
    //['g', 'c', 'd', '1', '0', 'e'],
];
var enharmonics = [
    ['a flat', 'c sharp/d flat', 'e flat', '0', '4','f'],
    ['c sharp', 'g flat/f sharp', 'a flat', '7', '0', 'a sharp'],
    ['d flat', 'g flat/f sharp', 'a flat', '0', '5', 'b flat'],
    //['f sharp', 'b/c flat', 'd flat/c sharp', '6', '0', 'd sharp'],
    //['g flat', 'b', 'd flat', '0', '6', 'e flat'],
    //['c flat', 'e', 'g flat/f sharp', '0', '7', 'a flat'] ,
    //['b', 'e', 'f sharp/g flat', '5', '0', 'g sharp'],
    //['e', 'a', 'b/c flat', '4', '0', 'c sharp'],
];

var fifteenKeys = [];

//console.log(circleKeys[0]);

for (j = 0, len_ = enharmonics.length; j < len_; j++) {
    //var h = util.pickAKey(enharmonics[j]);
    //fifteenKeys[j] = h;
    //console.log(h);
    fifteenKeys.push(util.pickAKey(enharmonics[j]));
}

console.log('!' + fifteenKeys[1] + '!' + fifteenKeys.length);

