const constants = require('../lambda/custom/constants');
const ISPHelp = require('./helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');



console.log(ISPHelp.getSpeakableListOfDrills(drills));
