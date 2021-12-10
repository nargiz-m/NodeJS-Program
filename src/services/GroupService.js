import { Group } from "../models/Group.js";
import { winstonInstance } from "../helpers/winston-logger.js";

export const getAllGroups = async () => {
    try {
        return await Group.findAll();
    } catch (error) {
        winstonInstance.error(`getAllGroups method error: ${error.errors[0].message}`);
    }
};

export const getGroupById = async (groupId) => {
    try {
        const group = await Group.findByPk(groupId);
        return group;
    } catch (error) {
        winstonInstance.error(`getGroupById method error with passed groupId = ${groupId}: ${error.errors[0].message}`);
    }
};

export const createGroup = async (groupBody) => {
    try {
        const groupCreated = await Group.create(groupBody);
        return groupCreated;
    } catch (error) {
        winstonInstance.error(`createGroup method error with passed groupBody = ${groupBody}: ${error.errors[0].message}`);
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
        winstonInstance.error(`updateGroupById method error with passed groupId = ${groupId} and updatedValues = ${updatedValues}: ${error.errors[0].message}`);
    }
};

export const deleteGroupById = async (groupId) => {
    try {
        const groupDeleted = await Group.destroy({ where: { id: groupId } });
        return groupDeleted;
    } catch (error) {
        winstonInstance.error(`deleteGroupById method error with passed groupId = ${groupId}: ${error.errors[0].message}`);
    }
};