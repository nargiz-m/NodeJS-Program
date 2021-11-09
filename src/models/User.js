import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://upodfjef:bWxGG-7XZyxYNkMBbgqXt7NNHwvedkmD@fanny.db.elephantsql.com/upodfjef')

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