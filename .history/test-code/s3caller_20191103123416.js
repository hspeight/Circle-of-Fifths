const S3Help = require('./s3v2');

 async function doIt() {
  const zip = await S3Help.getDrilldataFromS3();

  console.log(zip);
}

doIt();

