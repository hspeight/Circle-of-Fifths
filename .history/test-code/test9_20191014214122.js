const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

var attributes = {
    currentDrill: 2,
    currentLevel: 1,
    drillStatus: {
        'perfect-intervals': 0,
        'relative-keys': -1,
        'key-signatures': -1

    }
}

var myProp = 'relative-key';
if(attributes.drillStatus.hasOwnProperty(myProp)){
    console.log("yes, i have that property");
}















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