import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export const Group = sequelize.define('group', {
    name: Sequelize.STRING,
    permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING), 
        validate: {
            isIn: [['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']],
        }
    }},{
    timestamps: false,  
});