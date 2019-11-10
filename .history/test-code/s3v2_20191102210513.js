
// In Node.js v10.x, Readable streams have experimental support for async iteration.
// Instead of listening to the event stream's 'data' event, you can use a for...await loop.
async function example() {
  try {
    const result = await s3.selectObjectContent({/** params **/}).promise();

    const events = result.Payload;

    for await (const event of events) {
      // Check the top-level field to determine which event this is.
      if (event.Records) {
        // handle Records event
      } else if (event.Stats) {
        // handle Stats event
      } else if (event.Progress) {
        // handle Progress event
      } else if (event.Cont) {
        // handle Cont event
      } else if (event.End) {
        // handle End event
      }
    }
  } catch (err) {
    // handle error
  }
}