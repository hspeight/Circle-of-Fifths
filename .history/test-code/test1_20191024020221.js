const util = require('../lambda/custom/utils');
const constants = require('../lambda/custom/constants');
//var _ = require('lodash');
const drills = constants.drills;


const attributes = {
    "launchCount": 2,
    "drillStatus": [
        {
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

const drillStatus = [
    {
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

//let dtf = 'key-signatures';
//let dtf = 'perfect-intervals';
let dtf = 'relative-keys';

let arr = Object.keys(drills);
console.log(arr);
//console.log(arr.indexOf(dtf));
let DRILLREF = arr[arr.indexOf(dtf)];
console.log(arr[arr.indexOf(dtf)]);
level = 0;
console.log(drills[DRILLREF].levels[level]);

arr = Object.keys(drillStatus);
DRILLREF = arr[arr.indexOf(dtf)];
console.log(drillStatus[DRILLREF]);


