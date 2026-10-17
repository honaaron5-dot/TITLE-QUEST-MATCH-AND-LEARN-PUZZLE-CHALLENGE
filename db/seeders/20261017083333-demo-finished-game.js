
module.exports = {
  async up (queryInterface, Sequelize) {
    const db = queryInterface.sequelize;

    // 1. Find the parents that the earlier seeder created (May lagay na quotes sa SQL string)
    const [players] = await db.query('SELECT player_id, name FROM "players"');
    const [[level]] = await db.query('SELECT level_id FROM "levels" WHERE level_number = 1;');

    const player1 = players.find(p => p.name === 'Player One');
    const player2 = players.find(p => p.name === 'Player Two');
    const player3 = players.find(p => p.name === 'Player Three');
    const playerIncomplete = players.find(p => p.name === 'Player Incomplete');

    // 2. A game progress record that represents a finished game
    await queryInterface.bulkInsert('game_progress', [{
      player_id: player1.player_id,
      level_id: level.level_id,
      score: 300
    }, {
      player_id: player2.player_id,
      level_id: level.level_id,
      score: 250
    }, {
      player_id: player3.player_id,
      level_id: level.level_id,
      score: 200
    }, {
      player_id: playerIncomplete.player_id,
      level_id: level.level_id,
      score: 0
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('game_progress', null, {});
  }
};
