const fetch = require('node-fetch');
const { logger } = require('../../config/logger');
const { trivia } = require('../../constants');

const ENABLE_API = false;
const findTrivia = async () => {
  if (!ENABLE_API) return trivia.results;

  try {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium'
    );
    const res = await response.json();
    return res.results;
  } catch (error) {
    logger.error(error.message);
    return trivia.results;
  }
};

module.exports = {
  findTrivia,
};
