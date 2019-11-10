const constants = require('../lambda/custom/constants');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');



console.log(ISPHelp.getSpeakableListOfDrills(drills));
