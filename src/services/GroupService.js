import groupDefinition from "../models/Group.js";
import { winstonInstance } from "../helpers/winston-logger.js";
import { errorHandlerMiddleware } from "../helpers/error-handler.js";

const Group = groupDefinition();

export const getAllGroups = async (res) => {
    try {
        const groups = await Group.findAll()
        return errorHandlerMiddleware(groups, res);
    } catch (error) {
        winstonInstance.error(`getAllGroups method error: ${error.errors[0].message}`);
    }
};

export const getGroupById = async (groupId, res) => {
    try {
        const group = await Group.findByPk(groupId);
        return errorHandlerMiddleware(group, res);
    } catch (error) {
        winstonInstance.error(`getGroupById method error with passed groupId = ${groupId}: ${error.errors[0].message}`);
    }
};

export const createGroup = async (groupBody, res) => {
    try {
        const groupCreated = await Group.create(groupBody);
        return errorHandlerMiddleware(groupCreated, res);
    } catch (error) {
        winstonInstance.error(`createGroup method error with passed groupBody = ${groupBody}: ${error.errors[0].message}`);
    }
};

export const updateGroupById = async (groupId, updatedValues, res) => {
    try {
        const groupUpdated = await Group.update(
            updatedValues,
            { where: { id: groupId } }
        );
        return errorHandlerMiddleware(groupUpdated, res);
    } catch (error) {
        winstonInstance.error(`updateGroupById method error with passed groupId = ${groupId} and updatedValues = ${updatedValues}: ${error.errors[0].message}`);
    }
};

export const deleteGroupById = async (groupId, res) => {
    try {
        const groupDeleted = await Group.destroy({ where: { id: groupId } });
        return errorHandlerMiddleware(groupDeleted, res);
    } catch (error) {
        winstonInstance.error(`deleteGroupById method error with passed groupId = ${groupId}: ${error.errors[0].message}`);
    }
};