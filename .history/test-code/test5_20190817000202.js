const constants = require('../lambda/custom/constants');

const drills = constants.drills;

let productListSpeech = 'Key Signatures,Relative Key Pack';
productListSpeech = productListSpeech.replace(/,(?=[^,]*$)/, ', and '); // Replace last comma with an 'and '

const purchasableProducts = [{
        "productId": "amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014",
        "referenceName": "key-signatures",
        "type": "ENTITLEMENT",
        "name": "Key Signatures",
        "summary": "This will test you on the sharps and flats of key signatures",
        "entitled": "NOT_ENTITLED",
        "entitlementReason": "NOT_PURCHASED",
        "purchasable": "PURCHASABLE0",
        "activeEntitlementCount": 0,
        "purchaseMode": "TEST"
    },
    {
        "productId": "amzn1.adg.product.e8b05e85-a615-41f6-b912-071a768dc51f",
        "referenceName": "relative-keys",
        "type": "ENTITLEMENT",
        "name": "Relative Keys",
        "summary": "The relative Key pack is a drill that will help you to learn relative major and minor keys on the circle of fifths",
        "entitled": "NOT_ENTITLED",
        "entitlementReason": "NOT_PURCHASED",
        "purchasable": "PURCHASABLE6",
        "activeEntitlementCount": 0,
        "purchaseMode": "TEST"
    }
]

//const products = [];

console.log(getNextPurchaseableProduct());

function getNextPurchaseableProduct() {

    for (var j = 0; j < purchasableProducts.length; j++) {
        if (purchasableProducts[j].purchasable === 'PURCHASABLE') {
            //console.log(purchasableProducts[j].name + ' is purchaseable');
            break;
        }
    }

    console.log(j);

    return j === purchasableProducts.length ? undefined : purchasableProducts[j].referenceName;

}