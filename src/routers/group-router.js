import express from 'express';
import { getAllGroups, getGroupById, createGroup, updateGroupById, deleteGroupById } from '../services/GroupService.js';
import { deleteUserGroupsByGroupId } from '../services/UserGroupService.js';
import { authenticationFunction } from '../helpers/authentication.js';

export const groupRouter = express.Router();

groupRouter.get('/groups', authenticationFunction, async (req, res) => {
    const groups = await getAllGroups(res);
    res.json(groups);
});

groupRouter.get('/groups/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const group = await getGroupById(id, res);
    res.json(group);
});

groupRouter.post('/groups', authenticationFunction, async (req, res) => {
    const groupBody = req.body;
    const createdGroup = await createGroup(groupBody, res);
    res.json(createdGroup);
});

groupRouter.patch('/groups/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const updatedValues = req.body;
    await updateGroupById(id, updatedValues, res);
    res.status(200).json({message: 'Group was updated'});
});

groupRouter.delete('/groups/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    await deleteUserGroupsByGroupId(id, res);
    await deleteGroupById(id, res);
    res.status(200).json({message: 'Group was deleted'});
});