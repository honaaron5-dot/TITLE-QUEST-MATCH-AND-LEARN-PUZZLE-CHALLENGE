// What the Library Game Hub shows about YOUR game (Hub Contract, rule 1).
// Lab Step 6: replace every CHANGE_ME value with your own.
const pkg = require('../../package.json');

module.exports = {
  slug: 'tile-quest-match-and-learn',            // your group's game, lower case with hyphens, for example shelf-climb
  name: 'Tile Quest: A Fun Educational Tile-Matching Challenge',            // the name players will see
  team: 'team 4_ bscs (3-1)',            // your group's name and section, for example Bookworms (3-1)
  developer: 'honaaron5-dot',       // YOUR GitHub username: this build is yours
  description: 'Match the required tiles, complete the puzzle, answer the quiz that pops up, and pass the level to reach higher levels.',     // one sentence about how the game is played
  min_players: 1,               // change to the limits your game is designed for
  max_players: 20,
  version: pkg.version,         // read from package.json, do not edit here
};
