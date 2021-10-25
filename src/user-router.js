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

    res.json(user);
});

userRouter.post('/users', (req, res) => {
    const user = req.body;
    console.log('user: ' + user)
    const newUsers = [...users, user];

    res.json(newUsers);
})