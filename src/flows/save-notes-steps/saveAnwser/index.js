const { addKeyword } = require('@bot-whatsapp/bot');

const { saveNoteAnswer } = require('../save-notes.answer');
const { TRIVIA_CONVERSATION_BOT } = require('../../../constants');
const { saveIncorrectAnswerStepFlow } = require('../saveIncorrectAnswer');

const { saveAnswerNoteStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = saveAnswerNoteStep;
const [question1] = questions;

const saveAnswerStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 1000,
  },
  async (ctx, {}) => {
    saveNoteAnswer({ ctx, noteFieldValue: { answer: ctx.body } });
    return;
  },
  [saveIncorrectAnswerStepFlow]
);

module.exports = { saveAnswerStepFlow };
