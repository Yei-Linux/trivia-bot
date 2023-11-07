const { updateLastTimeUserInteraction } = require('../../services');
const { logger, cache } = require('../../config');

const { fullNameStepFlow } = require('../fullname-steps');
const { emailStepFlow } = require('../email-steps');
const { menuStepFlow } = require('../menu-steps');

/**
 * Determines which flow to go after the welcome flow.
 *
 * @param {Function} options.gotoFlow - The function to navigate to a specific flow.
 * @param {string} options.phone - The phone number of the user.
 * @param {Object} options.user - The user object.
 * @return {Promise} A promise that resolves when the function completes.
 */
const whichFlowAfterWelcome = async ({ gotoFlow, phone, user }) => {
  try {
    if (!user) {
      await gotoFlow(fullNameStepFlow);
      return;
    }

    if (user.fullName) cache().upsertStore(phone, { fullName: user.fullName });

    if (!user.email) {
      await gotoFlow(emailStepFlow);
      return;
    }

    await updateLastTimeUserInteraction(phone);
    await gotoFlow(menuStepFlow);
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { whichFlowAfterWelcome };
