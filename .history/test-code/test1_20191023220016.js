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

let dtf = 'key-signatures';
//let dtf = 'perfect-intervals';

let arr = Object.keys(drills);
console.log(arr);
console.log(arr.indexOf(dtf));
console.log(drills['relative-keys']).name;
console.log(drills.arr)

var D = drills.find(obj => {
    return obj.drillRef === 6
  })



let DRILL = drills.filter((e) => e.drill === dtf);

console.log(DRILL);

var found = attributes.drillStatus.find(function(element) {
  return element === 'key-signatures';
});

// expected output: 12
