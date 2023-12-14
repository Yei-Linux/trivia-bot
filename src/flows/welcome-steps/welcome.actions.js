const { TRIVIA_CONVERSATION_BOT } = require('../../constants');
const { logger } = require('../../config');

const { welcomeStep } = TRIVIA_CONVERSATION_BOT;
const { questions } = welcomeStep;
const [question1, question2] = questions;

const getWelcomeMessageIfIsNewUserOrNot = ({
  questionWithoutName,
  questionWithName,
  user,
}) => {
  if (user && user.fullName != undefined)
    return questionWithName.replaceAll('{{name}}', ` ${user.fullName}`);
  return questionWithoutName;
};

/**
 * Executes the welcome action for a registered user.
 *
 * @param {object} flowDynamic - The flowDynamic object.
 * @param {object} user - The user object.
 * @return {void} No return value.
 */
const welcomeIsRegisteredUserAction = async ({ flowDynamic, user }) => {
  try {
    const welcomeMessageTemplateProps = {
      questionWithoutName: question1,
      questionWithName: question2,
      user,
    };
    const welcomeMessage = getWelcomeMessageIfIsNewUserOrNot(
      welcomeMessageTemplateProps
    );

    await flowDynamic(welcomeMessage, { delay: 1000 });
    //await flowDynamic('This is my flowDynamic');
    return;
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = { welcomeIsRegisteredUserAction };
