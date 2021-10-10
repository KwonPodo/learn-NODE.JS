const EventEmitter = require("events");
// const emitter = new EventEmitter();

// event 등록
// emitter.on("log", (args) => {
//   console.log(args);
// });

// function log(callback) {
//   emitter.emit("log", "started...");
//   callback();
//   emitter.emit("log", "ended...");
// }

// module.exports.log = log;

// another way : becoming an EventEmitter itself (reusable Class making)

class Logger extends EventEmitter {
  log(callback) {
    this.emit("log", "started....");
    callback();
    this.emit("log", "ended....");
  }
}

module.exports.Logger = Logger;
