const { cache } = require('../../config');
const { findTrivia } = require('../../services');
const { saveTriviaToCache } = require('../../helpers');

/**
 * Executes the trivia action by retrieving the trivia question and sending it to the user.
 *
 * @param {Object} options - The options for the trivia action.
 * @param {string} options.provider - The provider for sending the trivia question.
 * @param {Object} options.ctx - The context object containing information about the user.
 * @param {number} options.questionIndex - The index of the trivia question.
 * @param {string} options.question - The trivia question.
 * @throws {Error} Throws an error if client cache is not found.
 * @return {Promise} A promise that resolves to the result of sending the trivia question.
 */
const triviaAction = async ({ provider, ctx, questionIndex, question }) => {
  const phone = ctx.from;
  const clientCache = cache().get(phone);
  if (!clientCache) throw new Error('Client cache not found');

  if (!clientCache.trivia) {
    const triviaApiResponse = await findTrivia();
    saveTriviaToCache(phone, triviaApiResponse);
  }

  const questionTrivia = cache().get(phone).trivia[questionIndex];

  const list = {
    bodyText: questionTrivia.question,
    buttonList: questionTrivia.title,
    listParams: [{ title: questionTrivia.title, rows: questionTrivia.rows }],
  };

  return await provider.sendList(
    phone,
    '',
    list.bodyText,
    '',
    list.buttonList,
    list.listParams
  );
};

module.exports = { triviaAction };
