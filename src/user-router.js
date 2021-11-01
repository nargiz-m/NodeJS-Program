import Joi from "joi";
import express from "express";
import { validateSchema } from "./utils.js";

export const userRouter = express.Router();

const users = [
    {
        id: 1,
        login: 'testUser',
        password: 'test1',
        age: 5,
        isDeleted: false
    }
];

const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

userRouter.get('/users', (req, res) => {
    res.json(users);
});

userRouter.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id)
    if(!user) {
        res.status(404).json({message: 'User not found'});
    }
    res.json(user);
});

userRouter.post('/users', validateSchema(schema), (req, res) => {
    const user = req.body;
    users.push(user);
    res.json(users);
});

userRouter.patch('/users/:id', validateSchema(schema), (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id)
    const updatedValues = req.body;
    if(!user) {
        res.status(404).json({message: 'User not found'});
    }
    for (var key in updatedValues) {
        user[key] = updatedValues[key];
    }
    res.json(user);
});

userRouter.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id == id)
    if(!user) {
        res.status(404).json({message: 'User not found'});
    }
    user.isDeleted = true;
    res.json(user);
});