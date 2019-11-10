const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

var attributes = {
    currentDrill: 2,
    currentLevel: 1,
    drillStatus: {
        'perfect-intervals' : 0,
        'relative-keys' : -1,
        'key-signatures': -1
    
}
}

attributes.drillStatus["perfect-intervals"] = 8;

console.log(attributes);

