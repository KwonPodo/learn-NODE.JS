// CallStack과 Task Queue를 넘나들 수 있다
// Global 객체에 정의되어 있기 때문에 따로 import하지 않아도 된다.
let num = 1;
const interval = setInterval(() => {
  console.log(num++);
}, 1000);

setTimeout(() => {
  console.log("Timeout!");
  clearInterval(interval);
}, 6000);
