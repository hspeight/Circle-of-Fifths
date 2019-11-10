const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;
var _ = require('lodash');

var attributes = {
    currentDrill: 2,
    currentLevel: 1,
    //drillStatus: []
    /*
    drillStatus: [
        {  
            drill: 'perfect-intervals',
            level: 2,
            completed: false
        },
        {
            drill: 'Bananas',
            level: 6,
            completed: false
        },
        
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
        
    ]
    */
}

attributes.currentDrillRef = 'heebee-geebee';
attributes.drillStatus = [];
let LEV = attributes.drillStatus.filter((e) => e.drill === attributes.currentDrillRef)[0];
if (LEV !== undefined) {
    console.log(LEV.level);
} else {
    console.log('NOT DEFINED 1');
    //let obj = '{drill: '.concat("'",attributes.currentDrillRef, "'", ', "level":  8, "completed": false}');
    let obj = ''.concat('{"drill":', 0, '}');
    //obj.concat('','{"drill": "heebe", "level":  0, "completed": false}');
    console.log(obj);
    attributes.drillStatus.push(JSON.parse(obj));
}
//console.log(attributes.drillStatus);
/*
LEV = attributes.drillStatus.filter((e) => e.drill === attributes.currentDrillRef)[0];
if (LEV !== undefined) {
    console.log(LEV.level);
} else {
    console.log('NOT DEFINED 2');
    let obj = '{"drill": '.concat(attributes.currentDrillRef, ', "level":  0, "completed": false}');
    attributes.drillStatus.push(JSON.parse(obj));
}

attributes.drillStatus[attributes.currentDrillRef] =  JSON.parse('{"level":  0, "completed": false}');
//console.log(attributes.drillStatus);
//console.log('=============================================');
//console.log(_.findKey(drills, { 'drill': 'perfect-intervals'}));
const keys = _.keys(drills);
//console.log(keys.levels);

const values = _.values(drills);
//console.log(values[0]);

let keyToFind = 'perfect-intervals';
//let keyToFind = 'relative-keys';
_.forIn(drills, (value, key) => {

    if (key === keyToFind) {
        console.log(value.name);
        console.log(`${key}: ${value.levels.length}`);
        //console.log(drills[attributes.currentDrillIndex]['levels'][attributes.drillStatus[attributes.drillStatusIndex].drill.level]);
        console.log(value.levels);
        console.log('');
        console.log(value.levels[1].interval);
    }
})

//const levelData = drills[attributes.currentDrillIndex]['levels'][attributes.drillStatus[attributes.drillStatusIndex].drill.level];
//console.log(levelData);


for(var key in drills) {
    //console.log(drills[key]);
    var value = drills[key];
    console.log('--------');
    console.log(value['levels'].length);
    console.log('--------');
}
*/
//console.log(Object.keys(drills));
//console.log(drills[1]['levels'].length);

//var myProp = 'perfect-intervals_';
//var myProp = 'relative-keys';

//console.log(attributes.drillStatus);
//console.log('--------------------');
//console.log(Object.getOwnPropertyNames(drills));

//if (!attributes.drillStatus.hasOwnProperty(myProp)) {
//    attributes.drillStatus[myProp] = JSON.parse('{"level":  14, "completed": false}');

    //console.log("No i do not, i have that property");
//    attributes.drillStatus[myProp]['level'] = 5;
    //attributes.drillStatus[myProp].level = 0;
    //console.log(attributes.drillStatus[myProp]);
//}

//attributes.drillStatus['another-drill'] = JSON.parse('{"level":  14, "completed": false}');
//console.log(attributes.drillStatus);
//console.log(Object.keys(attributes.drillStatus));
















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