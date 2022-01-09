import express from "express";
import { getAllUserGroups, addUsersToGroup } from "../services/UserGroupService.js";
import { authenticationFunction } from '../helpers/authentication.js';

export const userGroupRouter = express.Router();

userGroupRouter.get('/usergroups', authenticationFunction, async (req, res) => {
    const userGroups = await getAllUserGroups();
    res.json(userGroups, res);
});

userGroupRouter.post('/usergroups', authenticationFunction, async (req, res) => {
    const entityIds = req.body;
    const userGroups = await addUsersToGroup(entityIds.groupId, entityIds.userIds);
    res.json(userGroups, res);
});