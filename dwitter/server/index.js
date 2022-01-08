import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "morgan";
import "express-async-errors";
import dotenv from "dotenv";

import tweetsRouter from "./router/tweetsRoute.js";
import authRouter from "./router/authRoute.js";

dotenv.config();
console.log(process.env.JWT_SECRET);

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);
console.info(`API Server Start at port 8080`);
