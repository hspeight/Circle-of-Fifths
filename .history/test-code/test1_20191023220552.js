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

//let dtf = 'key-signatures';
let dtf = 'perfect-intervals';

let arr = Object.keys(drills);
console.log(arr);
//console.log(arr.indexOf(dtf));
let DRILLREF = arr[arr.indexOf(dtf)];
console.log(arr[arr.indexOf(dtf)]);
console.log(drills[DRILLREF].name);


