import express from "express";
import dotenv from "dotenv";
import expressWinston from 'express-winston';
import { userRouter } from "./routers/user-router.js";
import { groupRouter } from "./routers/group-router.js";
import { userGroupRouter } from "./routers/usergroup-router.js";
import { winstonInstance } from "./helpers/winston-logger.js";
import passport from "passport";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { Strategy } from "passport-local";
import BearerStrategy from "passport-http-bearer";
import employees from './employees.json'

dotenv.config();
const app = express();
const port = process.env.PORT;
const tokens = [];

app.use(expressWinston.logger({ winstonInstance }));
app.use(express.json());

passport.use(new Strategy(
  {session: false},
  (username, password, done) => {
    const employee = _.find(employees, { firstName : username })
    if(employee === undefined || employee.lastName !== password) {
      return done(null, false, "Bad credentials");
    }
    return done(null, employee);
  }
));

passport.use(new BearerStrategy((token, done) => {
  const result = _.find(tokens, {token});

  if(result === undefined) {
    return done(null, false);
  }
  return done(null, result)
}));

app.use(passport.initialize());

app.post('/authenticate', passport.authenticate('local', { session: false }), 
  (req, res) => {
    const user = req.user;
    const token = { id: user.id, token: uuidv4() }
    tokens.push(token);
    res.json(token);
  }
);

app.get('/employees', passport.authenticate('bearer', { session: false }),
  (req, res) => {
    res.json(employees)
  }
);

app.use(userRouter);
app.use(groupRouter);
app.use(userGroupRouter);

process.on('unhandledRejection', error => {
  winstonInstance.error(`unhandledRejection: ${error.message}`);
}).on('uncaughtException', error => {
  winstonInstance.error(`uncaughtException: ${error.message}`);
  process.exit(1);
});

app.use((err, req, res, next) => {
  winstonInstance.error(`Unhandled error: ${err.message}`);
  res.status(500).send("Internal Server Error")
});

app.listen(port, () => winstonInstance.info(`Server is listening on port ${port}`));