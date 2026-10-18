'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('players', [{
      name: 'Test Player One',
      total_score: 150,
      created_at: new Date()
    }, {
      name: 'Test Player Two',
      total_score: 200,
      created_at: new Date()
    }, {
      name: 'Test Player Three',
      total_score: 100,
      created_at: new Date()
    }, {
      name: 'Test Player Incomplete',
      total_score: 0,
      created_at: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('players', null, {});
  }
};
