const util = require('../lambda/custom/utils');
const constants = require('../lambda/custom/constants');

var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});

console.log(found);
// expected output: 12
