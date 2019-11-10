const S3Help = require('../lambda/custom/helpers/S3Helper');

 async function doIt() {
  const drillJSON = await S3Help.getDrilldataFromS3();

  console.log('############################################');
  console.log(JSON.parse(drillJSON)["key-signatures"]);
  console.log('############################################');

}

//doIt();

async function doit2() {

    console.log('start');
    console.log(await S3Help.getDrilldataFromS3());
    console.log('done');
    
}

