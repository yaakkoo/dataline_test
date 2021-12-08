'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        category: 'vehicle '
      }, {
        category: 'houses'
      }, {
        category: 'furniture'
      }, {
        category: 'accessory'
      }, {
        category: 'cloth'
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories' , {} , null)
  }
};
