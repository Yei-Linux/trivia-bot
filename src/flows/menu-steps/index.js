const { addKeyword } = require('@bot-whatsapp/bot');

const { isInactiveForGettingResponse } = require('../../services');
const { TRIVIA_CONVERSATION_BOT } = require('../../constants');
const { menuAnswer } = require('./menu.answer');
const { triviaStepFlow } = require('../trivia-steps');
const { saveNotesStepFlow } = require('../save-notes-steps');
const { getNotesStepFlow } = require('../view-my-notes-steps');

const { menuStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions, buttons } = menuStep;
const [question1] = questions;

const menuStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    buttons,
    delay: 1000,
  },
  async (ctx, { fallBack, endFlow }) => {
    const phone = ctx.from;
    const isInactive = await isInactiveForGettingResponse({ phone, endFlow });
    if (isInactive) return;

    await menuAnswer({
      optionTyped: ctx.body,
      phone,
      buttons,
      fallBack,
    });
    return;
  },
  [triviaStepFlow, saveNotesStepFlow, getNotesStepFlow]
);

module.exports = { menuStepFlow };
