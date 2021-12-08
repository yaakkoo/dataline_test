const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category : Sequelize.STRING
})