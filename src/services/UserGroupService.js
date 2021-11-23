import { UserGroup } from "../models/UserGroup.js";

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