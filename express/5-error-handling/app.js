import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  // 1. Asynchronous
  // readFile 함수를 호출한 것 만으로는 callback 함수 내부의 첫 인자로 에러가 전달되었기에 에러가 발생하지 않는다.
  // 비동기적인 것을 처리할 때에는 마지막에 붙이는 app.use로 에러가 잡히지 않는다.
  // express의 모든 미들웨어는 동기적으로 체인되어 있기에 각각의 미들웨어에서 특정한 에러가 throw되어야지만
  // 마지막의 app.use에 잡힌다.
  // callback함수로 에러가 전달되기에 외부에서는 에러가 발생헀는지 알 수 없다.
  // 따라서 비동기적인 방식의 에러는 해당하는 callback function 내부에서 처리하는 것이다.

  // fs.readFile('/file1.txt', (err, data) => {
  //   if (err) {
  //     res.sendStatus(404);
  //   }
  // });

  // 2. Synchronous
  //try{} catch{} is for catching sync errors
  // 동기적인 것은 에러가 발생시 throw 되기 때문에
  // try catch로 잡거나 마지막 app.use로 잡을 수 있다.
  try {
    const data = fs.readFileSync("/file1.txt");
  } catch (error) {
    res.sendStatus(404);
  }
});

// Promise
// Promise 또한 비동기이기 때문에 내부에서 에러가 발생해도 app.use가 잡지 못한다.
// Promise 내부에서 발생하는 에러는 Promise 안에서만 발생하는 에러이므로
// .catch(err)로 체인하여 에러를 잡는다.
app.get("/file2", (req, res) => {
  fsAsync
    .readFile("/file2.txt") //
    .catch((error) => {
      res.sendStatus(404);
    });
});

// await를 이용해서 코드를 동기적으로 사용할 수 있게 만들었으므로
// try catch를 이용해서 에러를 잡을 수 있다.
app.get("/file3", async (req, res) => {
  try {
    const data = await fsAsync.readFile("/file2.txt");
  } catch {
    res.sendStatus(404);
  }
});

// 버전 5 이하에서는: require('express-async-errors');

// Express 5 부터는 이렇게
// 안전망 middle-ware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);
