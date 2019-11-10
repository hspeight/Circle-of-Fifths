const constants = require('../lambda/custom/constants');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');

for (var key in drillstatus) {
    console.log(key);
}


//console.log(ISPHelp.getSpeakableListOfDrills(drills));
