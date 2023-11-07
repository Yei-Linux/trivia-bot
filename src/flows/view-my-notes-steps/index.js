const { addKeyword } = require('@bot-whatsapp/bot');

const { TRIVIA_CONVERSATION_BOT } = require('../../constants');

const { getNotesLinkStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = getNotesLinkStep;
const [question1] = questions;

const getNotesStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: false,
    delay: 1000,
  },
  async (ctx, { flowDynamic }) => {
    await flowDynamic('test url');
    return;
  },
  []
);

module.exports = { getNotesStepFlow };
