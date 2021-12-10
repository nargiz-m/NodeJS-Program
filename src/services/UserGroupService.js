import { UserGroup } from "../models/UserGroup.js";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { winstonInstance } from '../helpers/winston-logger.js'

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export const getAllUserGroups = async () => {
    try {
        return await UserGroup.findAll();
    } catch (error) {
        winstonInstance.error(`getAllUserGroups method error: ${error.errors[0].message}`);
    }
};

export const deleteUserGroupsByGroupId = async (groupId) => {
    try {
        const userGroupDeleted = await UserGroup.destroy({ where: { group_id: groupId } });
        return userGroupDeleted;
    } catch (error) {
        winstonInstance.error(`deleteUserGroupsByGroupId method error with passed groupId = ${groupId}: ${error.errors[0].message}`);
    }
};

export const deleteUserGroupsByUserId = async (userId) => {
    try {
        const userGroupDeleted = await UserGroup.destroy({ where: { user_id: userId } });
        return userGroupDeleted;
    } catch (error) {
        winstonInstance.error(`deleteUserGroupsByUserId method error with passed userId = ${userId}: ${error.errors[0].message}`);
    }
};

export const addUsersToGroup = async (groupId, userIds) => {
    const t = await sequelize.transaction();
    try {
        const usergroups = [];
        for (const userId of userIds) {
            const usergroup = await UserGroup.create({
                group_id: groupId,
                user_id: userId
            },{ 
                transaction: t 
            });
            usergroups.push(usergroup);
        }
      
        await t.commit();
        return usergroups;
    } catch (error) {
        await t.rollback();
        winstonInstance.error(`addUsersToGroup method error with passed groupId = ${groupId} and userIds = ${userIds}: ${error.errors[0].message}`);
    }
}