const { addKeyword } = require('@bot-whatsapp/bot');

const { delay } = require('../../helpers');
const { updateUser } = require('../../services');
const { cache } = require('../../config');
const { TRIVIA_CONVERSATION_BOT } = require('../../constants');
const { emailStepFlow } = require('../email-steps');

const { fullNameStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = fullNameStep;
const [question1] = questions;

const fullNameStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 2000,
  },
  async (ctx, { flowDynamic }) => {
    const phone = ctx.from;
    const fullName = ctx.body;

    cache().upsertStore(phone, { fullName });

    await updateUser(phone, { fullName, phone });
    await flowDynamic('Great 😄', { delay: 1000 });
    return;
  },
  [emailStepFlow]
);

module.exports = { fullNameStepFlow };
