const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.USERNAME, '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false
});

module.exports = sequelize