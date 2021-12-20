import express from "express";
import employees from '../employees.json'
import jwt from "jsonwebtoken";

export const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
  const user = employees.find(user => user.username === req.body.username);
  if(!user || user.password !== req.body.password ) {
    res.status(400).send('Wrong credentials')
  }
  const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "15m" });
  res.status(200).json({accessToken: accessToken});
});