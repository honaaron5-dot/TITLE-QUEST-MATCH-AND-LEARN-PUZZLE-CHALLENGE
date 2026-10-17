'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Seed Admins
    await queryInterface.bulkInsert('admins', [
      {
        username: 'admin_tilequest',
        password_hash: '$2b$10$SampleHashForTileQuestAdmin1',
        role: 'SuperAdmin'
      },
      {
        username: 'editor_tilequest',
        password_hash: '$2b$10$SampleHashForTileQuestAdmin2',
        role: 'Editor'
      }
    ], {});

    // 2. Seed Players
    await queryInterface.bulkInsert('players', [
      { name: 'Player One', total_score: 300 },
      { name: 'Player Two', total_score: 250 },
      { name: 'Player Three', total_score: 200 },
      { name: 'Player Incomplete', total_score: 0 }
    ], {});

    // 3. Seed Levels
    await queryInterface.bulkInsert('levels', [
      { level_number: 1, difficulty: 'Easy' },
      { level_number: 2, difficulty: 'Medium' }
    ], {});

    // Query Level 1 ID para sa Puzzles at Questions
    const db = queryInterface.sequelize;
    const [[level1]] = await db.query(
       'SELECT level_id FROM "levels" WHERE level_number = 1;'
    );

    // 4. Seed Puzzles
    await queryInterface.bulkInsert('puzzles', [
      { level_id: level1.level_id, required_pairs: 4 }
    ], {});

    // 5. Seed Questions
    await queryInterface.bulkInsert('questions', [
      { level_id: level1.level_id, question_text: 'What is the core mechanic of Tile Quest?', answer: 'Match tiles and answer quiz' }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {});
    await queryInterface.bulkDelete('puzzles', null, {});
    await queryInterface.bulkDelete('levels', null, {});
    await queryInterface.bulkDelete('players', null, {});
    await queryInterface.bulkDelete('admins', null, {});
  }
};
