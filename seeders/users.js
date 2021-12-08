'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name : 'yazan',
        email : "yazan@yazan.com",
        password : "123"
      },
      {
        name : 'yazan1',
        email : "yazan1@yazan.com",
        password : "123"
      },
      {
        name : 'yazan2',
        email : "yazan2@yazan.com",
        password : "123"
      },
      {
        name : 'yazan3',
        email : "yazan3@yazan.com",
        password : "123"
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users' , {} , null)
  }
};
