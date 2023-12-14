const { addKeyword } = require('@bot-whatsapp/bot');

const { TRIVIA_CONVERSATION_BOT } = require('../../constants');
const { emailAnswer } = require('./email.answer');
const { menuStepFlow } = require('../menu-steps');

const { emailStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = emailStep;
const [question1] = questions;

const emailStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 1000,
  },
  async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
    await emailAnswer({
      gotoFlow,
      fallBack,
      flowDynamic,
      email: ctx.body,
      phone: ctx.from,
    });
    return;
  }
);

module.exports = { emailStepFlow };
