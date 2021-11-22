import express from 'express';
import { getAllGroups, getGroupById, deleteGroupById } from '../services/GroupService.js';

export const groupRouter = express.Router();

groupRouter.get('/groups', async (req, res) => {
    const groups = await getAllGroups();
    res.json(groups);
});

groupRouter.get('/groups/:id', async (req, res) => {
    const { id } = req.params;
    const group = await getGroupById(id);
    if(!group){
        res.status(404).json({message: 'Group not found'});
    }
    res.json(group);
});

groupRouter.delete('/groups/:id', async (req, res) => {
    const { id } = req.params;
    const groupDeleted = await deleteGroupById(id);
    if(groupDeleted == 1) {
        res.status(200).json({message: 'Group was deleted'});
    }
    res.status(404).json({message: 'Group not found'});
});