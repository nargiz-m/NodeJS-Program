import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export const UserGroup = sequelize.define('usergroup', {
    user_id: Sequelize.INTEGER,
    group_id: Sequelize.INTEGER,
    },{
        timestamps: false,
});