import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export const User = sequelize.define('user', {
  login: Sequelize.STRING,
  password: Sequelize.STRING,
  age: Sequelize.INTEGER,
  isDeleted: {
    type: Sequelize.BOOLEAN,
    field: 'isdeleted'
  },},{
  timestamps: false,
});