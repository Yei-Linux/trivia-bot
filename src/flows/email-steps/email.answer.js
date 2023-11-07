const { updateUser, updateLastTimeUserInteraction } = require('../../services');
const { isValidEmail } = require('../../validators');
const { delay } = require('../../helpers');
const { logger } = require('../../config');
const { menuStepFlow } = require('../menu-steps');

const {
  CONSTANTS: {
    MESSAGES: { INVALID_EMAIL },
  },
} = require('../../constants');

/**
 * Executes the emailAnswer function which handles the user's email response.
 *
 * @param {Object} options - An object containing the following parameters:
 *   - {function} gotoFlow - The function to navigate to a specific flow.
 *   - {function} fallBack - The function to execute when the email is invalid.
 *   - {function} flowDynamic - The function to handle dynamic flows.
 *   - {string} email - The user's email address.
 *   - {string} phone - The user's phone number.
 * @return {undefined}
 */
const emailAnswer = async ({
  gotoFlow,
  fallBack,
  flowDynamic,
  email,
  phone,
}) => {
  try {
    const isValid = isValidEmail(email);
    await delay(1000);

    if (!isValid) {
      await updateLastTimeUserInteraction(phone);
      await flowDynamic(INVALID_EMAIL, { delay: 1000 });
      await fallBack();
      return;
    }

    await updateUser(phone, { phone, email });
    await gotoFlow(menuStepFlow);
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { emailAnswer };
