import express from "express";
import { createUser, getAutoSuggestUsers, getUserById, softDeleteUserById, updateUserById } from "../services/UserService.js";
import { deleteUserGroupsByUserId } from "../services/UserGroupService.js";
import { authenticationFunction } from '../helpers/authentication.js';

export const userRouter = express.Router();

userRouter.get('/users', authenticationFunction, async (req, res) => {
    const loginSubstring = req?.query?.loginSubstring || '';
    const limit = req?.query?.limit;

    if(limit && !Number.isInteger(+limit)) {
        res.status(400).json({message: 'Bad request'});
    } else {
        const users = await getAutoSuggestUsers(loginSubstring, limit);
        res.json(users);
    }
});

userRouter.get('/users/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id);
    if(!user) {
        res.status(404).json({message: 'User not found'});
    }
    res.json(user);
});

userRouter.post('/users', authenticationFunction, async (req, res) => {
    const userData = req.body;
    const user = await createUser(userData);
    if(!user) {
        res.status(400).json({message: 'Bad request'});
    }
    res.json(user);
});

userRouter.patch('/users/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const updatedValues = req.body;
    const userUpdated = await updateUserById(id, updatedValues);
    if(userUpdated == 1) {
        res.status(200).json({message: 'User was updated'});
    }
    res.status(404).json({message: 'User not found'});
});

userRouter.delete('/users/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    await deleteUserGroupsByUserId(id);
    const userDeleted = await softDeleteUserById(id);
    if(userDeleted == 1) {
        res.status(200).json({message: 'User was deleted'});
    }
    res.status(404).json({message: 'User not found'});
});