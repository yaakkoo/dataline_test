'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: Sequelize.STRING,
      arabic_name: Sequelize.TEXT,
      price: Sequelize.INTEGER,
      createDate : Sequelize.DATE,
      startDate: Sequelize.DATE,
      duration: Sequelize.DATE,
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id"
        }
      },
      customField_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "customFields",
          key: "id"
        }
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Products")

  }
};
