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

exports.isEntitled = function (entitledProducts, productRef) {

  return entitledProducts.some(function checkEntitled(entitledProducts) {
    return entitledProducts.referenceName === productRef || productRef === 'perfect-intervals';
  });

}

exports.getSpeakableListOfDrills = function (drills) {

  let arr = Object.keys(drills);  
  var DRILLNAMES = '';
  for (ref of arr) {
      let DRILLREF = arr[arr.indexOf(ref)]; //e.g. key-signatures
      let DRILLNAME = drills[DRILLREF].name;
      DRILLNAMES += DRILLNAME + ', ';
  }
  let speakableList = DRILLNAMES.slice(0, -2); // knock of the lat comma & space

  return speakableList.replace(/,(?=[^,]*$)/, ', and ');
}