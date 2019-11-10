var util = require('../lambda/custom/utils');
//var asset = require('../lambda/custom/assets');

var circleKeys_ = [
    ['c', 'f', 'g', '0', '0', 'a'],
    ['f', 'b flat', 'c', '0', '1', 'd'],
    ['b flat', 'e flat', 'f', '0', '2', 'g'],
    ['e flat', 'a flat', 'b flat', '0', '3', 'c'],
    ['a flat', 'E1A', 'e flat', '0', '4','f'],
    ['E1A', 'E2A', 'a flat', 'E1S', 'E1F', 'E1R'], //E1S=sharps, E1F=flats, E1R=relative minor
    ['E2A', 'E3A', 'E1A', 'E2S', 'E2F', 'E2R'], //E2S=sharps, E2F=flats, E2R=relative minor
    ['E3A', 'e', 'E2A', 'E3S', 'E3F', 'E3R'], //E3S=sharps, E3F=flats, E3R=relative minor
    ['e', 'a', 'E3', '4', '0', 'c sharp'],
    ['a', 'd', 'e', '3', '0', 'f sharp'],
    ['d', 'g', 'a', '2', '0', 'b'],
    ['g', 'c', 'd', '1', '0', 'e'],
];
/*
var enharmonics_1 = [
    ['a flat', 'c sharp/d flat', 'e flat', '0', '4','f'],
    ['c sharp', 'g flat/f sharp', 'a flat', '7', '0', 'a sharp'],
    ['d flat', 'g flat/f sharp', 'a flat', '0', '5', 'b flat'],
    ['f sharp', 'b/c flat', 'd flat/c sharp', '6', '0', 'd sharp'],
    ['g flat', 'b', 'd flat', '0', '6', 'e flat'],
    ['c flat', 'e', 'g flat/f sharp', '0', '7', 'a flat'] ,
    ['b', 'e', 'f sharp/g flat', '5', '0', 'g sharp'],
    ['e', 'a', 'b/c flat', '4', '0', 'c sharp'],
];

var enharmonics_2 = [];
// Create a version of enharmonics_1 but with one of the equivalents selected at random
for (j = 0, len_ = enharmonics_1.length; j < len_; j++) {
    enharmonics_2.push(util.pickAKey(enharmonics_1[j]));
}
var circleKeys = circleKeys_.concat(enharmonics_2);
///////////////////////////////////////////////////////////////////////////////////////
console.log('!' + circleKeys + '!' + circleKeys.length);
for (j = 0, len_ = circleKeys.length; j < len_; j++) {
    console.log('>' + circleKeys[j].length + '<');    
}
console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

var fif = [];

for (j = 0, len_ = circleKeys.length; j < len_; j++) {
    for (k = 0, len2 = 3; k < len2; k++) {
        if (!fif.includes(circleKeys[j][k])) {
            console.log('>' + circleKeys[j][k] + '<');
            fif.push(circleKeys[j][k]);
        }
    }
}
//    var uniqueItems = Array.from(new Set(circleKeys[j]));
    console.log('!' + fif + '!' + fif.length);
//}
*/

// create a 12keys array containing the 9 normal keys plus either/or enharmonic
var k1 = ['c', 'f', 'b flat', 'e flat', 'a flat', 'e', 'a', 'd', 'g'];
var E1 = Math.floor((Math.random() * 2)); // c sharp or d flat
var E2 = Math.floor((Math.random() * 2)); // f sharp or g flat
var E3 = Math.floor((Math.random() * 2)); // b or c flat

var subs = [];

if (E1 == 0) {
    subs['E1A']  = 'c sharp';
    subs['E1S']  = '7-';
    subs['E1F']  = '0--';
    subs['E1R']  = 'a sharp---';
} else {
    subs['E1A']  = 'd flat';
    subs['E1S']  = '0-';
    subs['E1F']  = '5--';
    subs['E1R']  = 'b flat---';
}
if (E2 == 0) {
    subs['E2A'] = 'f sharp';
    subs['E2S'] = '6+';
    subs['E2F'] = '0++';
    subs['E2R'] = 'd sharp+++';
} else {
    subs['E2A'] = 'g flat';
    subs['E2S'] = '0+';
    subs['E2F'] = '6++';
    subs['E2R'] = 'e flat+++';
}
if (E3 == 0) {
    var E3A = 'b';
    var E3S = '5';
    var E3F = '0';
    var E3R = 'g sharp';
} else {
    var E3A = 'c flat';
    var E3S = '0';
    var E3F = '7';
    var E3R = 'a flat';
}

for (j = 0, len_ = circleKeys_.length; j < len_; j++) {

    console.log('>' + circleKeys_[j] + '<');



            var x = circleKeys_[j].indexOf('E1A');
            //console.log('x=' + x + ' ' + circleKeys_[j]);
            if (x >= 0) {
                circleKeys_[j].splice(x, 1, subs['E1A']);
            }

            var x = circleKeys_[j].indexOf('E1S');
            if (x >= 0) {
                circleKeys_[j].splice(x, 1, subs['E1S']);
            }
}

//console.log(circleKeys_);

for (j = 0, len_ = subs.length; j < len_; j++) {
    console.log('elm is ', subs[j]);
}