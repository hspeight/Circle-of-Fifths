

const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const ISPHelp = require('../lambda/custom//helpers/ISPHelper');
const drills = constants.drills;


const attributes = {
    "launchCount": 6,
    "drillStatus": [
        {
            "drill": {
                "level": 5,
                "ref": "key-signatures"
            }
        },
        {
            "drill": {
                "level": 1,
                "ref": "perfect-intervals"
            }
        }
    ],
    "skillState": "_STARTLEVEL",
    "purchasableProducts": [
        {
            "productId": "amzn1.adg.product.e8b05e85-a615-41f6-b912-071a768dc51f",
            "referenceName": "relative-keys",
            "type": "ENTITLEMENT",
            "name": "Relative Keys",
            "summary": "The relative Key pack is a drill that will help you to learn relative major and minor keys on the circle of fifths",
            "entitled": "NOT_ENTITLED",
            "entitlementReason": "NOT_PURCHASED",
            "purchasable": "PURCHASABLE",
            "activeEntitlementCount": 0,
            "purchaseMode": "TEST"
        }
    ],
    "levelScore": 0,
    "currentLevel": 1,
    "thisDrillName": "Perfect Intervals",
    "currentDrill": 0,
    "drillRef": "perfect-intervals",
    "questionNum": 1,
    "percentScore": 100,
    "entitledProducts": [
        {
            "productId": "amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014",
            "referenceName": "key-signatures",
            "type": "ENTITLEMENT",
            "name": "Key Signatures",
            "summary": "This will test you on the sharps and flats of key signatures",
            "entitled": "ENTITLED",
            "entitlementReason": "PURCHASED",
            "purchasable": "NOT_PURCHASABLE",
            "activeEntitlementCount": 1,
            "purchaseMode": "TEST"
        }
    ],
    "lastUseTimestamp": 1566684590000
}

    //console.log(ISPHelp.isEntitled(attributes.entitledProducts, 'relative-keys'));

    attributes.currentDrillRef = 'key-signatures';
    //attributes.currentDrill = attributes.drillStatus[(attributes.drillStatus.map(function(e) { return e.drill.ref; }).indexOf(attributes.currentDrillRef))];
    attributes.drillStatusIndex = attributes.drillStatus.map(function(e) { return e.drill.ref; }).indexOf(attributes.currentDrillRef); // get the index position in the drills array
    console.log(attributes.drillStatusIndex);

    //console.log(drills);

    //attributes.currentDrillIndex = drills.map(function(e) { return e.ref; }).indexOf('key-signatures');

    //console.log(attributes.currentDrillIndex);

    