import express from "express";
import { getAllUserGroups, addUsersToGroup } from "../services/UserGroupService.js";

export const userGroupRouter = express.Router();

userGroupRouter.get('/usergroups', async (req, res) => {
    const userGroups = await getAllUserGroups();
    res.json(userGroups);
});

userGroupRouter.post('/usergroups', async (req, res) => {
    const entityIds = req.body;
    const userGroups = await addUsersToGroup(entityIds.groupId, entityIds.userIds);
    if(!userGroups) {
        res.status(400).json({message: 'Bad request'});
    }
    res.json(userGroups);
});