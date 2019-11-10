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

console.log(attributes.drillStatus.filter((e) => e.drill === 'key-signatures'));

var found = attributes.drillStatus.find(function(element) {
  return element === 'key-signatures';
});

console.log(found);
// expected output: 12
