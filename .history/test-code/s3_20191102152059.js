
const aws = require('aws-sdk');
const s3 = new aws.S3();


function getLevelDataFromS3 () {

    const params = {
        Bucket: 'cof-drills',
        Key: 's3csv.csv',
        ExpressionType: 'SQL',
        Expression: 'SELECT user_name FROM S3Object WHERE cast(age as int) > 20',
        InputSerialization: {
            CSV: {
                FileHeaderInfo: 'USE',
                RecordDelimiter: '\n',
                FieldDelimiter: ','
            }
        },
        OutputSerialization: {
            CSV: {}
        }
    };
}

const lookupTimezone = (zipCode) => {
    return new Promise((resolve, reject) => {
        try {
            const bucketName = process.env.S3_PERSISTENCE_BUCKET;
            const keyName = 'zipcode.csv';
            const query = `SELECT timezone from S3Object s WHERE s.zip ='${zipCode}' LIMIT 1`;
            let returnVal = 0;
            
            const params = {
              Bucket: bucketName,
              Key: keyName,
              ExpressionType: 'SQL',
              Expression: query,
              InputSerialization: {
                CSV: {
                  FileHeaderInfo: 'USE',
                },
                CompressionType: 'NONE',
              },
              OutputSerialization: {
                CSV: {
                },
              }
            };
            
            console.log('start select');
            s3.selectObjectContent(params, (err, data) => {
            	if (err) {
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

const zip = await lookupTimezone('98101');
