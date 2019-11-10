module.exports.zeroPad = function(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

module.exports.getS3Metadata = function (BUCKET, MP3FILE) {

    // Got promise code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
    return new Promise(resolve => {

            const AWS = require('aws-sdk');
            const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
            //const BUCKET = Bucket;
            const bucketParams = {
                    Bucket: BUCKET,
                    Key: MP3FILE
            };

            s3.headObject(bucketParams, function (err, data) {
                    //console.log('@' + PREFIX);
                    if (err) {
                            console.log("s3.headObject error", err);
                    } else {
                            //console.log('>' + JSON.stringify(data.Contents.length) + '<');
                            //if (data.Contents.length) {
                            //        MP3FILE = data.Contents[0].Key;
                            //} else {
                            //        MP3FILE = 'Problem found mp3';
                           // }
                    }
                    resolve(data);
                   //resolve(MP3FILE); // This returns the file name
                    // need to somehow also return the metadata.
            });

    });
}

module.exports.geConstants = function (bucket, key) {

    return new Promise(resolve => {

            const AWS = require('aws-sdk');
            s3 = new AWS.S3({ apiVersion: '2006-03-01' });
            var CONSTANTS = '';
            var bucketParams = {
                    Bucket: bucket,
                    Key:    key,
            };

            s3.getObject(bucketParams, function (err, data) {
                    if (err) {
                            console.log("s3.getObject error", err);
                    } else {
                            //console.log('>' + JSON.stringify(data.Contents.length) + '<');
                            if (data.Body.length) {
                                DRILLDATA = data.Body.toString();
                                    console.log('>Done ');
                            } else {
                                    DRILLDATA = 'Problem - no data';
                            }
                            resolve(DRILLDATA);

                            //console.log(data.Contents[0].Key);
                    }
            });
    });
}

module.exports.getData = async function () {

    // Setting the bucket and files parameters
   const bucket = 'cof-drills';
   const key = 'drills.data';
   const params = {
       Bucket: bucket,
       Key: key,
   };
   try {
       const data =  s3.getObject(params);

       // Getting the Body of the response 
       var content = data.Body.toString();

   } catch (err) {
       console.log(err);
       const message = `Error getting object ${key} from bucket ${bucket}.`;
       console.log(message);
       throw new Error(message);
   }

   // Sending the response back
   return content;

}