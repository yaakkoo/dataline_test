const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const bcryptjs = require('bcryptjs');

module.exports = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.TEXT,
})