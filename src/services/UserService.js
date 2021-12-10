import { User } from "../models/User.js";
import { winstonInstance } from "../helpers/winston-logger.js";
import { Sequelize } from "sequelize";

const op = Sequelize.Op;

export const getAutoSuggestUsers = async (loginSubstring, limitVal) => {
    try {
        const users = await User.findAll({ 
            where: {
                login: {
                    [op.like]: `%${loginSubstring}%`
                }
            },
            order: [['login', 'ASC']],
            limit: limitVal,
        });
        return users;
    } catch (error) {
        winstonInstance.error(`getAutoSuggestUsers method error with passed loginSubstring = ${loginSubstring} and limitVal = ${limitVal}: ${error.errors[0].message}`);
    }
}

export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        winstonInstance.error(`getUserById method error with passed userId = ${id}: ${error.errors[0].message}`);
    }
}

export const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        winstonInstance.error(`createUser method error with passed userData = ${JSON.stringify(userData)}: ${error.errors[0].message}`);
    }
}

export const updateUserById = async (userId, updatedData) => {
    try {
        const userUpdated = await User.update(
            updatedData,
            { where: { id: userId } }
        );
        return userUpdated;
    } catch (error) {
        winstonInstance.error(`updateUserById method error with passed userId = ${userId} and updatedData = ${updatedData}: ${error.errors[0].message}`);
    }
}

export const softDeleteUserById = async (userId) => {
    try {
        const userDeleted = await User.update(
            { isDeleted: true},
            { where: { id: userId } }
        );
        return userDeleted;
    } catch (error) {
        winstonInstance.error(`softDeleteUserById method error with passed userId=${userId}: ${error.errors[0].message}`);
    }
}