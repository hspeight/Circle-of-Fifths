const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

var attributes = {
    currentDrill: 2,
    currentLevel: 1,
    drillStatus: {
        
        'perfect-intervals': {
            level: 0,
            completed: false
        },
        /*
        'relative-keys': {
            level: -1,
            completed: false
        },
        'key-signatures': {
            level: -1,
            completed: false
        },
        'order-of-sharps': {
            level: -1,
            completed: false
        },
        'pot-luck': {
            level: -1,
            completed: false
        },
        */
    }
}

console.log(drills[1]['levels'].length);

var myProp = 'perfect-intervals_';
//var myProp = 'relative-keys';

//console.log(attributes.drillStatus);
//console.log('--------------------');
console.log(Object.keys(attributes.drillStatus).length);

if (!attributes.drillStatus.hasOwnProperty(myProp)) {
    attributes.drillStatus[myProp] = JSON.parse('{"level":  14, "completed": false}');

    //console.log("No i do not, i have that property");
//    attributes.drillStatus[myProp]['level'] = 5;
    //attributes.drillStatus[myProp].level = 0;
    //console.log(attributes.drillStatus[myProp]);
}

//attributes.drillStatus['another-drill'] = JSON.parse('{"level":  14, "completed": false}');
console.log(attributes.drillStatus);
console.log(Object.keys(attributes.drillStatus).length);
















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