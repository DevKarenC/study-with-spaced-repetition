const Sequelize = require('sequelize');
const db = require('../db');

const Email = db.define('email', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  item: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  message: {
    type: Sequelize.TEXT,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { max: 4, min: 0 },
  },
});

module.exports = Email;
