import { Group } from "../models/Group.js";
import { Sequelize } from "sequelize";

const op = Sequelize.Op;

export const getAllGroups = async () => {
    try {
        return await Group.findAll();
    } catch (error) {
        console.error("Get all groups error", error)
    }
}

export const getGroupById = async (id) => {
    try {
        const group = await Group.findByPk(id);
        return group;
    } catch (error) {
        console.error("Get group by id error", error)
    }
}

export const deleteGroupById = async (groupId) => {
    try {
        const groupDeleted = await Group.destroy({ where: { id: groupId } });
        return groupDeleted;
    } catch (error) {
        console.error("Delete group by id error", error)
    }
}