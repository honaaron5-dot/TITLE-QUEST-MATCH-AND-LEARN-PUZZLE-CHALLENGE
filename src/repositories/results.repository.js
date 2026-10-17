async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT 
      CAST(l.level_number AS VARCHAR) AS session_code,
      CURRENT_TIMESTAMP AS started_at,
      CURRENT_TIMESTAMP AS ended_at,
      CAST(p.player_id AS VARCHAR) AS school_id,
      p.name AS nickname,
      gp.score,
      (gp.score >= 200) AS completed
    FROM game_progress gp
    JOIN players p ON p.player_id = gp.player_id
    JOIN levels l ON l.level_id = gp.level_id
    WHERE (CAST(:since AS timestamptz) IS NULL)
    ORDER BY gp.score DESC
  `;
  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { since: since ? since.toISOString() : null }
  });
} 