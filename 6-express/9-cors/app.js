import express from "express";
// 브라우저의 CORS 정책에 의해 헤더이름을 항상 정확하게 지정해야 하는 불편함을 해결하기 위해
// npm corse라는 유용한 내부 미들웨어가 존재한다.
import cors from "cors";

app.use(
  cors({
    origin: ["http://127.0.0.1:5500"],
    optionsSuccessStatus: 200,
    credentials: true, // Access-Control-Allow-Credentials: true
  })
);

const app = express();
// 브라우저에서만 가지고 있는 CORS 정책
// 클라이언트와 서버가 서로 다른 IP에 있을 경우, 원칙적으로 데이터를 교환할 수 없음
// Access-Control-Allow-Origin을 헤더에 추가해야 브라우저에서 서버가 허용함을 알 수 있다.
// 기본적으로는 다른 IP에서는 데이터 쉐어링이 불가능하다.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(8080);
