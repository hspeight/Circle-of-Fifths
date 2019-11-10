var util = require('../lambda/custom/utils');
var asset = require('../lambda/custom/assets');

var date = new Date();

console.log(util.periodOfDay(date.getHours()));

console.log(asset.ASSET_IMG.mainImage);
console.log(asset.ASSET_AUD.wrongAnswerAudio);