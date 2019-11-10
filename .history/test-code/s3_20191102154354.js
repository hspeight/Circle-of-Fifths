
const aws = require('aws-sdk');
const s3 = new aws.S3();


function getLevelDataFromS3 () {

    const params = {
        Bucket: 'cof-drills',
        Key: 's3csv.csv',
        ExpressionType: 'SQL',
        Expression: 'SELECT user_name FROM S3Object WHERE user_name="hector',
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

    s3.selectObjectContent(params, (err, data) => {
        if (err) {
            // Handle error
            return;
        }
    
        // data.Payload is a Readable Stream
        const eventStream = data.Payload;
        
        // Read events as they are available
        eventStream.on('data', (event) => {
            if (event.Records) {
                // event.Records.Payload is a buffer containing
                // a single record, partial records, or multiple records
                process.stdout.write(event.Records.Payload.toString());
            } else if (event.Stats) {
                console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
            } else if (event.End) {
                console.log('SelectObjectContent completed');
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
        });
    });

    //return params['Payload'];
}



const data = getLevelDataFromS3();
//console.log(data);
