const S3Help = require('./s3v2');

 async function doIt() {
  const drillJSON = await S3Help.getDrilldataFromS3();

  console.log('############################################');
  console.log(typeof(drillJSON));
  console.log('############################################');

}

doIt();

