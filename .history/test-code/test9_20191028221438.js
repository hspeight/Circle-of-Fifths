const constants = require('../lambda/custom/constants');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');

let arr = Object.keys(drills);
console.log(arr);

for (var key in drills) {
    console.log(key);
    //let DRILLREF = arr[arr.indexOf(key)]; //e.g. key-signatures
    //console.log(DRILLREF);
}


//console.log(ISPHelp.getSpeakableListOfDrills(drills));
