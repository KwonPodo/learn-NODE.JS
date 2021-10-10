const process = require("process");

console.log(process.execPath);
console.log(process.version);
console.log(process.pid);
console.log(process.ppid);
console.log(process.platform);
console.log(process.env);
console.log(process.uptime());
console.log(process.cwd());
console.log(process.cpuUsage());

setTimeout(() => {
  console.log("setTimeout");
}, 0);
// setTimeout이라는 함수가 Task Queue에 이미 있음에도 불구하고,
// nextTick함수는  이를 무시하고
// Task Queue 제일 앞부분에 배치되어 우선적으로 실행이된다.
process.nextTick(() => {
  console.log("nextTick");
});

for (let i = 0; i < 5; i++) {
  console.log("for loop");
}
