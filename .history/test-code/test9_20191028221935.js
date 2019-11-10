const constants = require('../lambda/custom/constants');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');

let arr = Object.keys(drills);
console.log(arr);

for (ref of arr) {
    console.log(ref);
    let DRILLREF = arr[arr.indexOf(ref)]; //e.g. key-signatures
    console.log(DRILLREF);
}


//console.log(ISPHelp.getSpeakableListOfDrills(drills));
