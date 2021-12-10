import express from "express";
import dotenv from "dotenv";
import winston from 'winston';
import expressWinston from 'express-winston';
import { userRouter } from "./routers/user-router.js";
import { groupRouter } from "./routers/group-router.js";
import { userGroupRouter } from "./routers/usergroup-router.js";

const winstonInstance = winston.createLogger({
    transports: new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({format: 'DD-MMM-YYYY HH:mm:ss'}),
        winston.format.printf(
         info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    })
});

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(expressWinston.logger({ winstonInstance }));
app.use(express.json());
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