
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

    return params;
}



const data = await getLevelDataFromS3();
console.log(data);
