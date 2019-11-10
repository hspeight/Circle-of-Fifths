const util = require('../lambda/custom/utils');
const constants = require('../lambda/custom/constants');


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

var found = attributes.find(function(element) {
  return element === 'key-signatures';
});

console.log(found);
// expected output: 12
