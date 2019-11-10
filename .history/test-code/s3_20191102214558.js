const aws = require('aws-sdk');
const s3 = new aws.S3();
var drills = {};

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

const getDataUsingS3Select = async (params) => {

    return new Promise((resolve, reject) => {

        s3.selectObjectContent(params, (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            // This will be an array of bytes of data, to be converted
            // to a buffer
            const records = [];

            // This is a stream of events
            data.Payload.on('data', (event) => {
                    // There are multiple events in the eventStream, but all we 
                    // care about are Records events. If the event is a Records 
                    // event, there is data inside it
                    if (event.Records) {
                        records.push(event.Records.Payload);
                    }
                })
                .on('error', (err) => {
                    reject(err);
                })
                .on('end', () => {
                    // Convert the array of bytes into a buffer, and then
                    // convert that to a string
                    let planetString = Buffer.concat(records).toString('utf8');

                    // 2
                    // remove any trailing commas
                    planetString = planetString.replace(/\,$/, '');

                    // 3
                    // Add into JSON 'array'
                    planetString = `[${planetString}]`;

                    try {
                        const planetData = JSON.parse(planetString);
                        resolve(planetData);
                    } catch (e) {
                        reject(new Error(`Unable to convert S3 data to JSON object. S3 Select Query: ${params.Expression}`));
                    }
                });
        })
    })

    //return params['Payload'];
}



//const data = getLevelDataFromS3();
console.log(getDataUsingS3Select(params));