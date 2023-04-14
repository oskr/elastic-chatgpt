const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Schema = sequelize.define('Schema', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  schema: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

module.exports = Schema;