import Joi from "joi";
import express from "express";
import { validateSchema } from "../services/utils.js";
import { createUser, getAutoSuggestUsers, getUserById, softDeleteUserById, updateUserById } from "../services/UserService.js";

export const userRouter = express.Router();

const schema = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

userRouter.get('/users', async (req, res) => {
    const loginSubstring = req?.query?.loginSubstring || '';
    const limit = req?.query?.limit;

    if(limit && !Number.isInteger(+limit)) {
        res.status(400).json({message: 'Bad request'});
    } else {
        const users = await getAutoSuggestUsers(loginSubstring, limit);
        res.json(users);
    }
});

userRouter.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if(!user) {
        res.status(404).json({message: 'User not found'});
    }
    res.json(user);
});

userRouter.post('/users', validateSchema(schema), async (req, res) => {
    const userData = req.body;
    const user = await createUser(userData);
    res.json(user);
});

userRouter.patch('/users/:id', validateSchema(schema), async (req, res) => {
    const { id } = req.params;
    const updatedValues = req.body;
    const userUpdated = await updateUserById(id, updatedValues);
    if(userUpdated == 1) {
        res.status(200).json({message: 'User was updated'});
    }
    res.status(404).json({message: 'User not found'});
});

userRouter.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const userDeleted = await softDeleteUserById(id);
    if(userDeleted == 1) {
        res.status(200).json({message: 'User was deleted'});
    }
    res.status(404).json({message: 'User not found'});
});