const { delay } = require('../../helpers');
const { updateLastTimeUserInteraction } = require('../../services');
const { isCorrectListItemSelected } = require('../../validators');
const { logger } = require('../../config');

/**
 * Asynchronously handles the trivia answer, updating user interaction time, and performing fallback if the selected option is not valid.
 *
 * @param {Object} options - An object containing the following properties:
 *   - optionTyped {any} - The typed option.
 *   - phone {string} - The user's phone number.
 *   - listRowsParams {Object} - The parameters for the list rows.
 *   - fallBack {Function} - The fallback function to be executed if the selected option is not valid.
 * @return {Promise<void>} - A promise that resolves with no value.
 */
const triviaAnswer = async ({
  optionTyped,
  phone,
  listRowsParams,
  fallBack,
}) => {
  try {
    await delay(1000);
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectListItemSelected(optionTyped, listRowsParams);

    if (!isValid) {
      await fallBack();
      return;
    }
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { triviaAnswer };
