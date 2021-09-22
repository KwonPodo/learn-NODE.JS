const process = require("process");

console.log("code1");
console.time("timeout 0");
// 정확하게 0초가 보장되지 않는다.
// callback function이 수행되기 위해서는
// callstack이 비어있어야 한다.
setTimeout(() => {
  console.timeEnd("timeout 0");
  console.log("setTimeout 0");
}, 0);

console.log("code2");
setImmediate(() => {
  console.log("setImmediate");
});

console.log("code3");
process.nextTick(() => {
  console.log("process.nextTick");
});
