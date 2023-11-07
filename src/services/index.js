const user = require('./users');
const trivia = require('./trivia');
const notes = require('./notes');

module.exports = { ...user, ...trivia, ...notes };
