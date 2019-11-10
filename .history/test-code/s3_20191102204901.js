
const aws = require('aws-sdk');
const s3 = new aws.S3();
var drills = {};

const params = {
    Bucket: 'cof-drills',
    Key: 's3json.json',
    ExpressionType: 'SQL',
    Expression: 'select * from s3object s',
    InputSerialization: { 'CompressionType': 'NONE','JSON': {'Type': 'DOCUMENT'}},
    OutputSerialization: {'JSON': { 'RecordDelimiter': '\n',}}
};

function getLevelDataFromS3 () {
    
    s3.selectObjectContent(params, (err, data) => {
        if (err) {
            console.error(err);
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
                //process.stdout.write(event.Records.Payload.toString());
                drills = JSON.parse(event.Records.Payload.toString());
                //console.log(drills);
                //console.log('A');
                //console.log(drills.type);
                //console.log('B');
                //console.log('*' + drills.type);
            } else if (event.Stats) {
                console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
            } else if (event.End) {
                console.log('SelectObjectContent completed');
                console.log(typeof(drills));
                return drills;
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
