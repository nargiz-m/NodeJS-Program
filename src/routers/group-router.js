import express from 'express';
import { getAllGroups, getGroupById, createGroup, updateGroupById, deleteGroupById } from '../services/GroupService.js';
import { deleteUserGroupsByGroupId } from '../services/UserGroupService.js';
import { authenticationFunction } from '../helpers/authentication.js';

export const groupRouter = express.Router();

groupRouter.get('/groups', authenticationFunction, async (req, res) => {
    const groups = await getAllGroups();
    res.json(groups);
});

groupRouter.get('/groups/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const group = await getGroupById(id);
    if(!group){
        res.status(404).json({message: 'Group not found'});
    }
    res.json(group);
});

groupRouter.post('/groups', authenticationFunction, async (req, res) => {
    const groupBody = req.body;
    const createdGroup = await createGroup(groupBody);
    if(!createdGroup){
        res.status(400).json({message: 'Something went wrong'});
    }
    res.json(createdGroup);
});

groupRouter.patch('/groups/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    const updatedValues = req.body;
    const groupUpdated = await updateGroupById(id, updatedValues);
    if(groupUpdated == 1) {
        res.status(200).json({message: 'Group was updated'});
    }
    res.status(400).json({message: 'Something went wrong'});
});

groupRouter.delete('/groups/:id', authenticationFunction, async (req, res) => {
    const { id } = req.params;
    await deleteUserGroupsByGroupId(id);
    const groupDeleted = await deleteGroupById(id);
    if(groupDeleted == 1) {
        res.status(200).json({message: 'Group was deleted'});
    }
    res.status(404).json({message: 'Group not found'});
});