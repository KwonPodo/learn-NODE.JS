import express from "express";
import fsAsync from "fs/promises";
// async 내부에서 에러가 발생할 경우,
// 미들웨어에서 Promise를 return 하는 경우에만
// 에러를 감지해서 에러를 제일 마지막 app.use에서 감지할 수 있다.
import {} from "express-async-errors";

const app = express();

app.get("/", (req, res, next) => {
  return fsAsync.readFile("/file2.txt").catch(next);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
  next();
});

//github.com/expressjs/express/issues/2259#issuecomment-433586394
//github.com/blakeembrey/async-middleware

app.listen(8080);
