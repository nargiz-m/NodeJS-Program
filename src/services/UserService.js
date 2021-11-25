import { User } from "../models/User.js";
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
        console.error("Get auto-suggested users error: ", error);
    }
}

export const getUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        console.error("Get by id error: ", error)
    }
}

export const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        if(error instanceof Sequelize.ValidationError){
            return console.error( 'Captured validation error: ', error.errors[0].message);
        }
        console.error("User creation error: ", error)
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
        console.error("User update error: ", error)
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
        console.error("User delete error: ", error)
    }
}