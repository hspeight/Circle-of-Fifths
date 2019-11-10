const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');

const drills = constants.drills;

const constants = require('../constants');
const drills = constants.drills;
const util = require('../utils');

const levelData = drills[attributes.currentDrill]['relative'][attributes.currentlevel - 1]; // drill/round

console.log(levelData);

const levelArray = util.shuffleArray(levelData['data']);

console.log(levelArray);

const quality = levelData['relative'];

//console.log(quality);

const circleWithEnharmonics = constants.circleWithEnharmonics;
const intervalQuestions = constants.intervalQuestions;