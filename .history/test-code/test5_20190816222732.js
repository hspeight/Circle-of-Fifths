
const constants = require('../lambda/custom/constants');

const drills = constants.drills;

let productListSpeech = 'Key Signatures,Relative Key Pack';
productListSpeech = productListSpeech.replace(/,(?=[^,]*$)/, ', and '); // Replace last comma with an 'and '

const products = [ { productId: 'amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014',
referenceName: 'key-signatures',
type: 'ENTITLEMENT',
name: 'Key Signatures',
summary: 'This will test you on the sharps and flats of key signatures',
entitled: 'NOT_ENTITLED',
entitlementReason: 'NOT_PURCHASED',
purchasable: 'PURCHASABLE',
activeEntitlementCount: 0,
purchaseMode: 'TEST' } ]

//for (var j = 0; j < products.length; j++) {
//    console.log(Object.values(products[0]).indexOf('Key Signatures') > -1);

    console.log(products && products.length);

