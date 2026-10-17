'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      question_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      level_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'levels',
          key: 'level_id'
        },
        onDelete: 'CASCADE'
      },
      question_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};