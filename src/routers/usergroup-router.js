import express from "express";
import { getAllUserGroups } from "../services/UserGroupService.js";

export const userGroupRouter = express.Router();

userGroupRouter.get('/usergroups', async (req, res) => {
    const userGroups = await getAllUserGroups();
    res.json(userGroups);
});