const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

module.exports = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    arabic_name : Sequelize.TEXT,
    price: Sequelize.INTEGER,
    startDate : Sequelize.DATE,
    createDate: Sequelize.DATE,
    duration: Sequelize.DATE,
    category_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "Categories",
            key: "id"
        }
    },
    customField_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "customFields",
            key: "id"
        }
    }
})