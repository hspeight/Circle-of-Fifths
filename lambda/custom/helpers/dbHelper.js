//https://github.com/dabblelab/alexa-dynamodb-skill-template
var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
const tableName = 'COF-Users';
const partitionKeyName = 'COF-UserID';
//const region = 'us-east-1';
const persistenceAdapter = new DynamoDbPersistenceAdapter({
  tableName,
  partitionKeyName,
  //region,
  createTable: false
});

exports.saveDBAttributes = async function (handlerInput) {

    // Return the passed array minus valToRemove
    // https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays#approach-2-filter
  
    const dbattributes = await handlerInput.attributesManager.getPersistentAttributes(); // <--dynamodb

    dbattributes.invocations = 321;
    handlerInput.attributesManager.setPersistentAttributes(dbattributes);
    await handlerInput.attributesManager.savePersistentAttributes();

    return 'GOOD';
  
  }
