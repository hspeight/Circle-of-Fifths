const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const drills = constants.drills;

const attributes = {
    currentDrill: 1,
    currentlevel: 1
}
const levelData = drills[attributes.currentDrill]['relative'][attributes.currentlevel - 1]; 

console.log(levelData);

const levelArray = util.shuffleArray(levelData['data']);

console.log(levelArray);

const quality = levelData['relative'];

//console.log(quality);

const circleWithEnharmonics = constants.circleWithEnharmonics;
const intervalQuestions = constants.intervalQuestions;