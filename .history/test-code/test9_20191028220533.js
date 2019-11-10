const constants = require('../lambda/custom/constants');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');

console.log(Object.values(drills));

for (let value of Object.values(drills)) {
    console.log(value); // John, then 30
  }
