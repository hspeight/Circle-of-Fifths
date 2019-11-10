const lookupDrill = (zipCode) => {
  console.log('A');
  return new Promise((resolve, reject) => {
      try {
         // const bucketName = process.env.S3_PERSISTENCE_BUCKET;
          //const Key = 'zipcode.csv';
         //const query = `SELECT timezone from S3Object s WHERE s.zip ='${zipCode}' LIMIT 1`;
          let returnVal = 0;
          
          const params = {
            Bucket: 'cof-drills',
            Key: 's3json.json',
            ExpressionType: 'SQL',
            Expression: 'select * from s3object s',
            InputSerialization: {
                'CompressionType': 'NONE',
                'JSON': {
                    'Type': 'DOCUMENT'
                }
            },
            OutputSerialization: {
                'JSON': {
                    'RecordDelimiter': '\n',
                }
            }
        };
          
          console.log('start select');
          s3.selectObjectContent(params, (err, data) => {
            if (err) {
              console.error(err);
              reject(0);
            }
          
            const eventStream = data.Payload;
            
            eventStream.on('data', (event) => {
              if (event.Records) {
                returnVal = event.Records.Payload.toString();
                resolve(returnVal);
              } else if (event.Stats) {
                //console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
              } else if (event.End) {
                  //console.log('SelectObjectContent completed');
              }
            });
          
            // Handle errors encountered during the API call
            eventStream.on('error', (err) => {
              switch (err.name) {
                // Check against specific error codes that need custom handling
              }
            });
            eventStream.on('end', () => {
              // Finished receiving events from S3
              console.log(`returning: ${returnVal}`);
                resolve(returnVal);
            });
          });
      } catch (e) {
          console.log(e);
          reject(0);
      }
  })
};

 async function doIt() {
  const zip = await lookupDrill('98101');

  console.log(zip);
}

