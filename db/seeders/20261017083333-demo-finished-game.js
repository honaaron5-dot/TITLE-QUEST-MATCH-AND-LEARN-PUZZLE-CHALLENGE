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
  { session_id: 1, user_id: 1, name: 'Rina', total_score: 95, created_at: new Date() },
  { session_id: 1, user_id: 2, name: 'Player 2', total_score: 85, created_at: new Date() },
  { session_id: 1, user_id: 3, name: 'Player 3', total_score: 75, created_at: new Date() },
], {});

    const [playersList] = await db.query("SELECT player_id FROM players");

  // 6. Populating CHOICES Table
    await queryInterface.bulkInsert('choices', [
      { question_id: 1, choice_text: 'Option A', is_correct: true, createdAt: new Date(), updatedAt: new Date() },
      { question_id: 1, choice_text: 'Option B', is_correct: false, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // 7. Populating ANSWERS Table
    if (playersList.length >= 3) {
      await queryInterface.bulkInsert('answers', [
        { player_id: playersList[0].player_id, question_id: 1, selected_choice_id: 1, is_correct: true, createdAt: new Date(), updatedAt: new Date() },
        { player_id: playersList[1].player_id, question_id: 1, selected_choice_id: 1, is_correct: true, createdAt: new Date(), updatedAt: new Date() },
        { player_id: playersList[2].player_id, question_id: 1, selected_choice_id: 1, is_correct: true, createdAt: new Date(), updatedAt: new Date() }
      ], {});
    }

    // 9. Populating GAME_PROGRESS Table
    if (playersList && playersList.length >= 3) {
  await queryInterface.bulkInsert('game_progress', [
    { player_id: playersList[0].player_id, level_id: 1, score: 95 }, 
    { player_id: playersList[1].player_id, level_id: 1, score: 85 }, 
    { player_id: playersList[2].player_id, level_id: 1, score: 75 },
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