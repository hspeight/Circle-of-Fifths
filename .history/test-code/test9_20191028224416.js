const constants = require('../lambda/custom/constants');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');
const drills = constants.drills;
var _ = require('lodash');

let arr = Object.keys(drills);
console.log(arr);

var DRILLNAMES = '';
for (ref of arr) {
    console.log(ref);
    let DRILLREF = arr[arr.indexOf(ref)]; //e.g. key-signatures
    let DRILLNAME = drills[DRILLREF].name;
    DRILLNAMES += DRILLNAME + ', ';
}
let speakableList = DRILLNAMES.slice(0, -1);
console.log(speakableList.replace(/,(?=[^,]*$)/, ', and '));


//console.log(ISPHelp.getSpeakableListOfDrills(drills));
