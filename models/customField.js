const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define('customFields', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    title: Sequelize.STRING,
    description: Sequelize.TEXT
})