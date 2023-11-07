const { addKeyword } = require('@bot-whatsapp/bot');

const { saveNoteAnswer } = require('../save-notes.answer');
const { TRIVIA_CONVERSATION_BOT } = require('../../../constants');
const { saveIncorrectAnswer3StepFlow } = require('../saveIncorrectAnswer3');

const { saveIncorrectAnswer2NoteStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = saveIncorrectAnswer2NoteStep;
const [question1] = questions;

const saveIncorrectAnswer2StepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 1000,
  },
  async (ctx, {}) => {
    saveNoteAnswer({ ctx, noteFieldValue: { incorrectAnswer2: ctx.body } });
    return;
  },
  [saveIncorrectAnswer3StepFlow]
);

module.exports = { saveIncorrectAnswer2StepFlow };
