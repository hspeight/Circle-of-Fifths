const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

var attributes = {
    currentDrill: 2,
    currentLevel: 1,
    drillStatus: {
        'perfect-intervals': 0,
    }
}

var myProp = 'perfect-intervals_';
//var myProp = 'relative-keys';

console.log(attributes);
if (!attributes.drillStatus.hasOwnProperty(myProp)){
    //console.log("No i do not, i have that property");
    attributes.drillStatus[myProp] = 0;
    //console.log(attributes.drillStatus[myProp]);
}
console.log(attributes);
















/*
    // Check if the drill/level we are about to set up is in the drillstatus array and if not push it on.
if (attributes.drillStatus.filter(function (drill) {
    return drill.drill.ref === attributes.currentDrillRef
}).length === 0) {
console.log('PPPPUUUSSSHHHIIINNGGG ' + attributes.currentDrillRef);
// didn't find the drill in the drill status array so add it
attributes.drillStatus.push({
    "drill": {
        "ref": attributes.currentDrillRef,
        "level": 0,
        "completed": false
    }
});
}

attributes.drillStatus["perfect-intervals"] = 8;

console.log(attributes);

*/