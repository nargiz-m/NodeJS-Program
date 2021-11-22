import { Group } from "../models/Group.js";

export const getAllGroups = async () => {
    try {
        return await Group.findAll();
    } catch (error) {
        console.error("Get all groups error: ", error);
    }
};

export const getGroupById = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId);
        return group;
    } catch (error) {
        console.error("Get group by id error: ", error);
    }
};

export const createGroup = async (groupBody) => {
    try {
        const groupCreated = await Group.create(groupBody);
        return groupCreated;
    } catch (error) {
        console.error("Create group error: ", error);
    }
};

export const updateGroupById = async (groupId, updatedValues) => {
    try {
        const groupUpdated = await Group.update(
            updatedValues,
            { where: { id: groupId } }
        );
        return groupUpdated;
    } catch (error) {
        console.error("Update group by id error: ", error);
    }
};

export const deleteGroupById = async (groupId) => {
    try {
        const groupDeleted = await Group.destroy({ where: { id: groupId } });
        return groupDeleted;
    } catch (error) {
        console.error("Delete group by id error: ", error);
    }
};