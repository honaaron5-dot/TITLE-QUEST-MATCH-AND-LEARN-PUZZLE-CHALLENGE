async function findCompletedLevels(since) {
  const sql = `
    SELECT gp.progress_id, p.player_id, p.name AS player_name, 
           l.level_number, gp.score, l.difficulty
    FROM Game_Progress gp
    JOIN Player p ON p.player_id = gp.player_id
    JOIN LEVEL l ON l.level_id = gp.level_id
    WHERE (CAST(:since AS timestamptz) IS NULL OR gp.updated_at > CAST(:since AS timestamptz))
    ORDER BY gp.score DESC
  `;
  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { since: since ? since.toISOString() : null },
  });
}