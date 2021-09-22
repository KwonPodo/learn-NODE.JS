const fs = require("fs");

/* Readable Streams effectively operate in one of two modes.
: Simplified abstraction for the more complicated internal state management that is happening within the Readable Stream implementaion

Flowing Mode
: Data is read from the underlying system automatically and provided to an applicattion
as quikly as possible using events via the EventEmitter interface

Paused Mode
: stream.read() method must be called explicitly to read chunks of data from the steam


--> All Readable streams begin in paused mode but can be switched to flowing mode in one of the following ways:
    1. Adding a 'data' event handler
    2. Calling the steam.resume() method
    3. Calling the stream.pipe() method to send the data to a Writable Stream.

--> Readable Stream can switch back to paused mode using one of the following:
    1. If there are no pipe destinations, by calling the stream.pause() method.
    2. If there are pipe destinations, by removing all pipe destinations.
      Multiple pipe destinations may be removed by calling the stream.unpipe() method.
*/

/* Every Readable Streams are in one of three possible states
: 1. readable.readableFlowing === null
    No machanism for consuming the stream's data is provided. Stream will not generate data.
    To change the state to true:
      1. attach a listner for the 'data' event
      2. call readable.pipe()
      3. readable.resume()

  2. readable.readableFlowing === false
    Calling readable.pause(), readable.unpipe() will cause this state.
    Temporarily halting the flowing of events but not halting the generation of data.
    While in this state:
      - data may be accumulating within the stream's internal buffer.
      - attaching a listner for the 'data' event will not switch the state to 'true'.

  3. readable.readableFlowing === true
    State of generating data and emitting data.

*/

/* Caution: Chosse one API style
  1. readable.pipe() / readable.unpipe()
  2. readable.on('readable') / readable.read()
  3. readable.pause() / readable.resume()
*/

const data = [];
const readStream = fs.createReadStream("./file.txt", {
  // highWaterMark: 8, // default: 64kbytes
  // encoding: "utf-8",
});

readStream
  .on("data", (chunk) => {
    // console.log(chunk);
    data.push(chunk);
    console.count("data");
  })
  .on("end", () => {
    console.log(data.join(""));
  })

  .on("error", (error) => {
    console.error;
  });
