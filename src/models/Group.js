import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export const Group = sequelize.define('group', {
    name: Sequelize.STRING,
    permissions: Sequelize.ARRAY(Sequelize.STRING), 
    },{
    timestamps: false,  
});