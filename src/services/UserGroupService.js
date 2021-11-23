import { UserGroup } from "../models/UserGroup.js";

export const getAllUserGroups = async () => {
    try {
        return await UserGroup.findAll();
    } catch (error) {
        console.error('Get User-Group relationsips error: ', error);
    }
};