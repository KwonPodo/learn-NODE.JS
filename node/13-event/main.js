const logger = require("./logger.js");

// logger.log(() => {
//   console.log('....doing something!');
// })

const emitter = new logger.Logger();

emitter.on("log", (event) => {
  console.log(event);
});

emitter.log(() => {
  console.log(".....doing something!");
});

// EventEmitter는 한번 객체를 만들면, 객체 내에서 발생하는 event에 한해서 들을 수 있다.
// 여러가지 EventEmitter 객체를 만들면, 다른 Emitter에서 발생하는 event는 다른 Emitter에서 들을 수 없다.
