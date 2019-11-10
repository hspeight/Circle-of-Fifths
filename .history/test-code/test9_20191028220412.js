const constants = require('../lambda/custom/constants');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');

console.log(Object.values(drills));

for (var val in Object.entries(drills)) {
    console.log(val);
    //console.log(key.name);
}


//console.log(ISPHelp.getSpeakableListOfDrills(drills));
