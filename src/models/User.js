import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
const sequelize = new Sequelize(process.env.CONNECTION_URL);

export const User = sequelize.define('user', {
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      len: [3,30],
      notNull: {
        msg: 'Please enter your login'
      },
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/i,
      notNull: {
        msg: 'Please enter your password'
      }
    }
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 4,
      max: 130,
      isInt: true,
      notNull: {
        msg: 'Please enter your age'
      }
    }
  },
  isDeleted: {
    type: Sequelize.BOOLEAN,
    field: 'isdeleted',
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your deleted status'
      }
    }
  },},{
  timestamps: false,
});