import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL)

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

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