const util = require('../lambda/custom/utils');
const constants = require('../lambda/custom/constants');
//var _ = require('lodash');
const drills = constants.drills;


const attributes = {
    "launchCount": 2,
    "drillStatus": [{
            "drill": "key-signatures",
            "level": 1,
            "completed": false
        },
        {
            "drill": "relative-keys",
            "level": 1,
            "completed": false
        }
    ],
    "level": {
        "key": "major",
        "data": [
            "F SHARP MINOR"
        ]
    },
}

var drillStatus = [{
        "drill": "perfect-intervals",
        "level": 1,
        "completed": false
    },
    {
        "drill": "key-signatures",
        "level": 1,
        "completed": false
    }
]

let dtf = 'key-signatures-';
//let dtf = 'perfect-intervals';

//let arr = Object.keys(drills);
//console.log(arr);
//console.log(arr.indexOf(dtf));
//let DRILLREF = arr[arr.indexOf(dtf)];
//console.log(arr[arr.indexOf(dtf)]);
//level = 0;
//console.log(drills[DRILLREF].levels[level]);

function getRefIndex(drillStatus, drillref) {
    // get the index of the drill in drillstatus
    for (var key in drillStatus) {
        var value = drillStatus[key];
        if (value.drill === drillref)
            // console.log(key + " = " + JSON.stringify(value));
            return key;
    }
}

//console.log('index is ' + getRefIndex(drillStatus, dtf));

let idx = getRefIndex(drillStatus, dtf);
if (idx === undefined) {
    console.log('undefined');
} else {
    console.log(idx);
}