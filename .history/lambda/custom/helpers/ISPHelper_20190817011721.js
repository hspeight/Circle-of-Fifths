
exports.getAllEntitledProducts = function (inSkillProductList) {

    const entitledProductList = inSkillProductList.filter(record => record.entitled === 'ENTITLED');
    console.log(`Currently entitled products: ${JSON.stringify(entitledProductList)}`);
    return entitledProductList;
    
  }

  exports.getAllpurchasableProducts = function (inSkillProductList) {

    const purchasableProductList = inSkillProductList.filter(record => record.purchasable === 'PURCHASABLE');
    console.log(`^Currently purchasable products: ${JSON.stringify(purchasableProductList)}`);
    return purchasableProductList;
    
  }

  exports.getSpeakableListOfProducts = function (entitleProductsList) {
    const productNameList = entitleProductsList.map(item => item.name);
    console.log('>' + productNameList + '<');
    let productListSpeech = productNameList.join(', '); // Generate a single string with comma separated product names
    productListSpeech = productListSpeech.replace(/,(?=[^,]*$)/, ', and '); // Replace last comma with 'and '
    return productListSpeech;
  }

  exports.isEntitled = function (product) {
    return product.length > 0 && product[0].entitled === 'ENTITLED';
  }
  
/*
  exports.getNextPurchaseableProduct = function() {
    // loop through the list of purchaseable products and get the first one available for purchase
    for (var j = 0; j < purchasableProducts.length; j++) {
        if (purchasableProducts[j].purchasable === 'PURCHASABLE') {
            //console.log(purchasableProducts[j].name + ' is purchaseable');
            break;
        }
    }
    // j will be equal to the array length if there are no purchaseable products
    return j === purchasableProducts.length ? undefined : purchasableProducts[j];
}
*/