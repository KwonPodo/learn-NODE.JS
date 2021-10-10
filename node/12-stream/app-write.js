const fs = require("fs");

/* Writable Stream
  : Abstraction for a destination to which data is written.

Examples of Writable Streams
  - HTTP requests(client) / responses(server)
  - fs write streams
  - zlib streams
  - crypto streams
  - TCP sockets
  - child process stdin
  - process.stdout, process.stderr


  Usage Pattern

  const myStream = getWritableStreamSomehow();
  myStream.write('some data');
  myStream.write('some more data');
  myStream.end('done writing data');
*/

const writeStream = fs.createWriteStream("./file3.txt");
writeStream.on("finish", () => {
  console.log("finished!");
});

writeStream.write("hello!");
writeStream.write("hi!");
writeStream.end();
