const constants = require('../lambda/custom/constants');
const util = require('../lambda/custom/utils');
const ISPHelp = require('../lambda/custom/helpers/ISPHelper');

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

var drillsStatus = [];

var drillsStatus = [
	{
		"drill": {
            "name": "perfect intervals",
            "id": "perfect-intervals",
			"level": "1"		
        },
    },
    {
		"drill": {
            "name": "relative keys",
            "id": "relative-keys",
			"level": "3"		
		}
	}
]
*/


/*
console.log(drillsStatus);
console.log('***********************');

// when a new drill is started use this to test if the drill is in the drillstatus array. If not push it.
if (drillsStatus.filter(function (drill) {
        return drill.drill.id === "relative-keys"
    }).length == 0) {
    console.log('ok to add');
    drillsStatus.push({
        "drill": {
            "name": "next drill",
            "id": "next-drill",
            "level": "1"
        }
    });
} else {
    console.log('exists');
}

console.log(drillsStatus);

//sconsole.log(drills[0].id);

//let h = drills.filter(function(drill) { return drill.id === "relative-keys" });
//let h = util.getPackName(drills, drills[1].id);
//console.log(h[0].packName);
//console.log(h[0].packName);

//console.log(drillsStatus[2].drill.name);

//let h = resolutionsPerAuthority[0].values.filter(r => (r.value.id === requestedPack)).length; // returns an object array containing the name & id or nothing
/* vendors contains the element we're looking for */
//console.log(products.length);


//https://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
//pos = drills.map(function(e) { return e.ref; }).indexOf('pot-luck');
//console.log(pos);

var prod = {
    purchasableProducts: [{
            productId: 'amzn1.adg.product.ac798b5e-fb0d-4e44-bbed-60b2be0cd014',
            referenceName: 'key-signatures',
            type: 'ENTITLEMENT',
            name: 'Key Signatures',
            summary: 'This will test you on the sharps and flats of key signatures',
            entitled: 'NOT_ENTITLED',
            entitlementReason: 'NOT_PURCHASED',
            purchasable: 'NOPURCHASABLE',
            activeEntitlementCount: 0,
            purchaseMode: 'TEST'
        },
        {
            productId: 'amzn1.adg.product.e8b05e85-a615-41f6-b912-071a768dc51f',
            referenceName: 'relative-keys',
            type: 'ENTITLEMENT',
            name: 'Relative Keys',
            summary: 'The relative Key pack is a drill that will help you to learn relative major and minor keys on the circle of fifths',
            entitled: 'NOT_ENTITLED',
            entitlementReason: 'NOT_PURCHASED',
            purchasable: 'NOPURCHASABLE',
            activeEntitlementCount: 0,
            purchaseMode: 'TEST'
        }
    ]
}

// loop list of drills and get first one that is purchasable
//var nextProd = prod.filter(r => (r.value.id === requestedPack));


for (var i = 1; i < drills.length; i++) { // no need to start with product 0 as that is free
//console.log(i);
    var h = prod.purchasableProducts.filter(function (p) {
        return (p.referenceName === drills[i].ref && p.purchasable === 'PURCHASABLE')
    });
    if (h[0] !== undefined) {
        //console.log(h[0].referenceName);
        break;
    }
}

// if i = drills.length the ref was not found in purchasable products
console.log(h[0] !== undefined ? h[0].referenceName : 'No packs available for purchase');
//console.log(h[0]);
