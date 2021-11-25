import { UserGroup } from "../models/UserGroup.js";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export const getAllUserGroups = async () => {
    try {
        return await UserGroup.findAll();
    } catch (error) {
        console.error('Get User-Group relationsips error: ', error);
    }
};

export const deleteUserGroupsByGroupId = async (groupId) => {
    try {
        const userGroupDeleted = await UserGroup.destroy({ where: { group_id: groupId } });
        return userGroupDeleted;
    } catch (error) {
        console.error('User-Group by group deletion error: ', error);
    }
};

export const deleteUserGroupsByUserId = async (userId) => {
    try {
        const userGroupDeleted = await UserGroup.destroy({ where: { user_id: userId } });
        return userGroupDeleted;
    } catch (error) {
        console.error('User-Group by user deletion error: ', error);
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
        console.error('Adding Users to Group error: ', error);
    }
}