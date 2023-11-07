const { delay } = require('../../helpers');
const { updateLastTimeUserInteraction } = require('../../services');
const { isCorrectButtonSelected } = require('../../validators');
const { logger } = require('../../config');

/**
 * Executes a menu answer and performs the necessary actions based on the provided parameters.
 *
 * @param {Object} options - An object containing the following parameters:
 *   - {string} optionTyped - The option typed by the user.
 *   - {string} phone - The phone number of the user.
 *   - {Object} listRowsParams - The parameters of the list rows.
 *   - {Function} fallBack - The fallback function to be executed if the option typed is invalid.
 * @return {Promise<void>} A promise that resolves with no value.
 */
const menuAnswer = async ({ optionTyped, phone, buttons, fallBack }) => {
  try {
    await delay(1000);
    await updateLastTimeUserInteraction(phone);
    const isValid = isCorrectButtonSelected(optionTyped, buttons);

    if (!isValid) {
      await fallBack();
      return;
    }
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { menuAnswer };
