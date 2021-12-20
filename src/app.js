import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import expressWinston from 'express-winston';
import { loginRouter } from "./routers/login-router.js";
import { userRouter } from "./routers/user-router.js";
import { groupRouter } from "./routers/group-router.js";
import { userGroupRouter } from "./routers/usergroup-router.js";
import { winstonInstance } from "./helpers/winston-logger.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(expressWinston.logger({ winstonInstance }));
app.use(express.json());
app.use(cors());
app.use(loginRouter);
app.use(userRouter);
app.use(groupRouter);
app.use(userGroupRouter);

process.on('unhandledRejection', error => {
  winstonInstance.error(`unhandledRejection: ${error.message}`);
}).on('uncaughtException', error => {
  winstonInstance.error(`uncaughtException: ${error.message}`);
  process.exit(1);
});

app.listen(port, () => winstonInstance.info(`Server is listening on port ${port}`));