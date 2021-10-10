const fs = require("fs"); // file에서 기본적으로 할 수 있는 모든 동작들이 fs 모듈에서 제공됨

// 모든 API는 3가지 형태로 제공된다.
// 1. rename(oldPath, newPath, callback(error, data)): Asynchronous
// 2. try {renameSync(....)} catch(error){}: Synchronous -> Doesn't go to the next line until finished.
// 3. promises.rename().then().catch(0)

// Synchronous
try {
  fs.renameSync("./text.txt", "./text-new.txt");
} catch (error) {
  console.error(error);
}

// Asynchronous
fs.rename("./text-new.txt", "./text.txt", (error) => {
  console.error(error);
});
console.log("hello");

fs.promises
  .rename("./text2.txt", "./text-new.txt")
  .then(() => console.log("Done!"))
  .catch((error) => console.error(error));
