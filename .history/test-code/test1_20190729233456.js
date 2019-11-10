const util = require('../lambda/custom/utils');
const constants = require('../lambda/custom/constants');

const args = process.argv.slice(2); // passed args start at element 2 of the process.argv array
var num = args[0];
let div = util.getRandom(4, 6);

const result = num % div;

answerIn = 'b';
ANSWERS=['a','b/c flat'];
var enharmonic = ANSWERS[1].split('/');
console.log(enharmonic);
if( enharmonic.includes(answerIn) ? true : false) {
    console.log('it there');
}
