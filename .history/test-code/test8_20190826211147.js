

const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const ISPHelp = require('../lambda/custom//helpers/ISPHelper');
const drills = constants.drills;


    // Is the user entitled to the product?
    if (!ISPHelp.isEntitled(attributes.entitledProducts)) {
        //return makeUpsell('You down own it.', attributes.currentDrillRef, handlerInput);
        console.log('You down own it.');
    }

    