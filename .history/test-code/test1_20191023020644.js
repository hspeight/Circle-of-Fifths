const util = require('../lambda/custom/utils');
const constants = require('../lambda/custom/constants');
var _ = require('lodash');


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

//let dtf = 'perfect-intervals';
let dtf = 'relative-keys';

let LEV = attributes.drillStatus.filter((e) => e.drill === dtf);

console.log(LEV[0].drill);

var found = attributes.drillStatus.find(function(element) {
  return element === 'key-signatures';
});

// expected output: 12
