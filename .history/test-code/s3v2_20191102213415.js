
const aws = require('aws-sdk');
const s3 = new aws.S3();



// In Node.js v10.x, Readable streams have experimental support for async iteration.
// Instead of listening to the event stream's 'data' event, you can use a for...await loop.
async function example() {
    const params = {
        Bucket: 'cof-drills',
        Key: 's3json.json',
        ExpressionType: 'SQL',
        Expression: 'select * from s3object s',
        InputSerialization: { 'CompressionType': 'NONE','JSON': {'Type': 'DOCUMENT'}},
        OutputSerialization: {'JSON': { 'RecordDelimiter': '\n',}}
    };
  try {
    const result = await s3.selectObjectContent({Bucket: 'cof-drills',
    Key: 's3json.json',
    ExpressionType: 'SQL',
    Expression: 'select * from s3object s',
    InputSerialization: { 'CompressionType': 'NONE','JSON': {'Type': 'DOCUMENT'}},
    OutputSerialization: {'JSON': { 'RecordDelimiter': '\n',}}}).promise();

    const events = result.Payload;

    for await (const event of events) {
      // Check the top-level field to determine which event this is.
      if (event.Records) {
        // handle Records event
      } else if (event.Stats) {
        // handle Stats event
        console.log(`Processed ${event.Stats.Details.BytesProcessed} bytes`);
      } else if (event.Progress) {
        // handle Progress event
      } else if (event.Cont) {
        // handle Cont event
      } else if (event.End) {
        // handle End event
        console.log('SelectObjectContent completed');
      }
    }
  } catch (err) {
      console.error(err);
    // handle error
  }

}

console.log(example());
