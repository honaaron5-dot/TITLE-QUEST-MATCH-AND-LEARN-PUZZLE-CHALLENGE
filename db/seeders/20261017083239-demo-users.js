
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0001',
        full_name: 'Player One',
        email: 'player1@test.test',
        role: 'player',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        school_id: '2099-0002',
        full_name: 'Player Two',
        email: 'player2@test.test',
        role: 'player',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        school_id: '2099-0003',
        full_name: 'Player Three',
        email: 'player3@test.test',
        role: 'player',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        school_id: '2099-0004',
        full_name: 'Player Four',
        email: 'player4@test.test',
        role: 'player',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};