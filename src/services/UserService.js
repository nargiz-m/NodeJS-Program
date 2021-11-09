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
    let user = {};
    try {
        user = await User.findByPk(id);
    } catch (error) {
        console.error("Get by id error: ", error)
    }
    return user;
}

export const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        console.error("User creation error: ", error)
    }
}