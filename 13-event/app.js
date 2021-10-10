const EventEmitter = require("events");
const emitter = new EventEmitter();

const callback1 = (args) => {
  console.log("first callback - ", args);
};

emitter.on("jay", callback1);

emitter.on("jay", (args) => {
  console.log("second callback - ", args);
});

emitter.emit("jay", { message: 1 });
emitter.emit("jay", { message: 2 });
emitter.removeListener("jay", callback1);
emitter.emit("jay", { message: 3 });
