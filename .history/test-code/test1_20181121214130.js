var util = require('../lambda/custom/utils');
//var asset = require('../lambda/custom/assets');

const languageStrings = {
    'en' : require('../lambda/custom/i18n/en'),
  //  'en-GB' : require('./i18n/en-GB'),
  //  'it' : require('./i18n/it')
}

var circleKeys_ = [
    ['c', 'f', 'g', '0', '0', 'a'],
    ['f', 'b flat', 'c', '0', '1', 'd'],
    ['b flat', 'e flat', 'f', '0', '2', 'g'],
    ['e flat', 'a flat', 'b flat', '0', '3', 'c'],
    ['a flat', 'E1A', 'e flat', '0', '4','f'],
    ['E1A', 'E2A', 'a flat', 'E1S', 'E1F', 'E1R'], //E1S=sharps, E1F=flats, E1R=relative minor
    ['E2A', 'E3A', 'E1A', 'E2S', 'E2F', 'E2R'], //E2S=sharps, E2F=flats, E2R=relative minor
    ['E3A', 'e', 'E2A', 'E3S', 'E3F', 'E3R'], //E3S=sharps, E3F=flats, E3R=relative minor
    ['e', 'a', 'E3A', '4', '0', 'c sharp'],
    ['a', 'd', 'e', '3', '0', 'f sharp'],
    ['d', 'g', 'a', '2', '0', 'b'],
    ['g', 'c', 'd', '1', '0', 'e'],
];

//var ans = validQuiz.includes(mySlot);

console.log(languageStrings);

//console.log(SUPERLATIVE_100)