'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HourlyScoreboards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      station_id: {
        type: Sequelize.INTEGER
      },
      business_date: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      actual: {
        type: Sequelize.INTEGER
      },
      target: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HourlyScoreboards');
  }
};