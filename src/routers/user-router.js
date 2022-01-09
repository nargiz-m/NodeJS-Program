import express from "express";
import { createUser, getAutoSuggestUsers, getUserById, softDeleteUserById, updateUserById } from "../services/UserService.js";
import { deleteUserGroupsByUserId } from "../services/UserGroupService.js";
import { authenticationFunction } from '../helpers/authentication.js';

export const userRouter = express.Router();

userRouter.get('/users', authenticationFunction, async (req, res) => {
    const loginSubstring = req?.query?.loginSubstring || '';
    const limit = req?.query?.limit;
    const users = await getAutoSuggestUsers(loginSubstring, limit, res);
    res.json(users);
});

userRouter.get('/users/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const user = await getUserById(id, res);
    res.json(user);
});

userRouter.post('/users', authenticationFunction, async (req, res) => {
    const userData = req.body;
    const user = await createUser(userData, res);
    res.json(user);
});

userRouter.patch('/users/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const updatedValues = req.body;
    await updateUserById(id, updatedValues, res);
    res.status(200).json({message: 'User was updated'});
});

userRouter.delete('/users/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    await deleteUserGroupsByUserId(id);
    await softDeleteUserById(id, res);
    res.status(200).json({message: 'User was deleted'});
});