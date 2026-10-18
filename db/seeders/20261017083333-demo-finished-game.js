'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const db = queryInterface.sequelize;

    // 1. Populating ADMINS Table
    await queryInterface.bulkInsert('admins', [
      {
        username: 'admin_demo',
        password_hash: 'hashed_password_123',
        role: 'SuperAdmin'
      }
    ], {});

    // 2. Populating LEVELS Table
    await queryInterface.bulkInsert('levels', [
      {
        level_number: 1,
        difficulty: 'Easy'
      }
    ], {});

    const [[level]] = await db.query("SELECT level_id FROM levels LIMIT 1");
    const levelId = level ? level.level_id : 1;

    // 3. Populating PUZZLES Table
    await queryInterface.bulkInsert('puzzles', [
      {
        level_id: levelId,
        required_pairs: 6
      }
    ], {});

    // 4. Populating QUESTIONS Table
    await queryInterface.bulkInsert('questions', [
      {
        level_id: levelId,
        question_text: 'What is the core mechanic of Tile Quest?',
        answer: 'Match tiles'
      }
    ], {});

    // 5. Populating PLAYERS Table
    await queryInterface.bulkInsert('players', [
      {
        name: 'Player One',
        total_score: 100
      },
      {
        name: 'Player Two',
        total_score: 90
      },
      {
        name: 'Player Three',
        total_score: 85
      },
      {
        name: 'IncompletePlayer',
        total_score: 0
      }
    ], {});

    const [playersList] = await db.query("SELECT player_id FROM players");

    // 6. Populating GAME_PROGRESS Table
    if (playersList.length > 0) {
      await queryInterface.bulkInsert('game_progress', [
        {
          player_id: playersList[0].player_id,
          level_id: levelId,
          score: 100
        },
        {
          player_id: playersList[1].player_id,
          level_id: levelId,
          score: 90
        },
        {
          player_id: playersList[2].player_id,
          level_id: levelId,
          score: 85
        }
      ], {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('game_progress', null, {});
    await queryInterface.bulkDelete('players', null, {});
    await queryInterface.bulkDelete('questions', null, {});
    await queryInterface.bulkDelete('puzzles', null, {});
    await queryInterface.bulkDelete('levels', null, {});
    await queryInterface.bulkDelete('admins', null, {});
  }
}; 