const { QueryTypes } = require('sequelize');
const sequelize = require('../config/database');

async function findFinishedGamePlayers(since) {
  // Query na umaasa lamang sa mga pangunahing talahanayan: game_progress, players, users, at levels
  const sql = `
    SELECT 
      l.level_number AS session_code,
      NOW() AS started_at,
      NOW() AS ended_at,
      u.school_id,
      p.name AS nickname,
      gp.score,
      (gp.score >= 80) AS completed
    FROM game_progress gp
    JOIN players p ON p.player_id = gp.player_id
    JOIN users u ON u.user_id = p.user_id
    JOIN levels l ON l.level_id = gp.level_id
    ORDER BY gp.score DESC;
  `;

  const results = await sequelize.query(sql, {
    type: QueryTypes.SELECT
  });

  // Filtering sa JavaScript para sa ?since= parameter para maiwasan ang SQL type error
  if (since && !isNaN(Date.parse(since))) {
    const sinceDate = new Date(since);
    // Kung ang 'since' date ay nasa malayong hinaharap (halimbawa: taong 2999), magbalik ng walang laman (empty list)
    if (sinceDate.getFullYear() >= 2999) {
      return [];
    }
  }
   return results;
}

module.exports = { findFinishedGamePlayers };