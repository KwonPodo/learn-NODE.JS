const fs = require("fs");
const zlib = require("zlib");

/*
'pipe' event is emitted when the stream.pipe() method is called on a readable stream,
adding this writable to its set of destinations.

'unpipe' event is emitted when the stream.unpipe() method is called on a readable stream,
removing this writable to its set of destinations.
*/

const zlibStream = zlib.createGzip(); // 압축 모듈
const readStream = fs.createReadStream("./file.txt");
const writeStream = fs.createWriteStream("./file4.zip");

/* 
const piping = readStream.pipe(writeStream);
*/
const piping = readStream.pipe(zlibStream).pipe(writeStream);
piping.on("finish", () => {
  console.log("done!!");
});

// http server making
const http = require("http");
const server = http.createServer((req, res) => {
  // Synchronous

  // fs.readFile("file.txt", (err, data) => {
  //   res.end(data);
  // });

  // Asynchronous
  const stream = fs.createReadStream("./file.txt");
  stream.pipe(res);
});
server.listen(3000);
