const constants = require('../lambda/custom/constants');

const drills = constants.drills;

let productListSpeech = 'Key Signatures,Relative Key Pack';
productListSpeech = productListSpeech.replace(/,(?=[^,]*$)/, ', and '); // Replace last comma with an 'and '
/*
const purchasableProducts = [{
        "productId": "amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014",
        "referenceName": "key-signatures",
        "type": "ENTITLEMENT",
        "name": "Key Signatures",
        "summary": "This will test you on the sharps and flats of key signatures",
        "entitled": "NOT_ENTITLED",
        "entitlementReason": "NOT_PURCHASED",
        "purchasable": "PURCHASABLEx",
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
        "purchasable": "PURCHASABLE",
        "activeEntitlementCount": 0,
        "purchaseMode": "TEST"
    }
]
*/

const resolutionsPerAuthority = [
    {
        "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.99cfc3e2-7eea-4c93-a953-c33d0527a941.packType",
        "status": {
            "code": "ER_SUCCESS_MATCH"
        },
        "values": [
            {
                "value": {
                    "name": "key_signature",
                    "id": "key-signatures"
                }
            },
            {
                "value": {
                    "name": "relative_keys",
                    "id": "relative-keys"
                }
            }
        ]
    }
]

var drillsStatus = [
	{
		"drill": {
			"name": "perfect intervals",
			"level": "1"		
        },
    },
    {
		"drill": {
			"name": "relative keys",
			"level": "3"		
		}
	}
]

console.log(drillsStatus);
console.log('')
drillsStatus.push({
    "drill": {
        "name": "next drill",
        "level": "5"		
    }});
console.log(drillsStatus);
//console.log(drillsStatus[2]);

//let h = resolutionsPerAuthority[0].values.filter(r => (r.value.id === requestedPack)).length; // returns an object array containing the name & id or nothing
  /* vendors contains the element we're looking for */
//console.log(products.length);


function getNextPurchaseableProduct() {

    for (var j = 0; j < resolutionsPerAuthority.length; j++) {
        if (resolutionsPerAuthority[j].values.value === 'relative-kes') {
            //console.log(purchasableProducts[j].name + ' is purchaseable');
            break;
        }
    }

    console.log(j);

    // j will be equal to the array length if there are no purchaseable products
    return j === resolutionsPerAuthority.length ? undefined : resolutionsPerAuthority[j];

}


