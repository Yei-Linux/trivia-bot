const { addKeyword } = require('@bot-whatsapp/bot');

const { saveNoteAnswer } = require('../save-notes.answer');
const { TRIVIA_CONVERSATION_BOT } = require('../../../constants');
const { saveIncorrectAnswer2StepFlow } = require('../saveIncorrectAnswer2');

const { saveIncorrectAnswer1NoteStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = saveIncorrectAnswer1NoteStep;
const [question1] = questions;

const saveIncorrectAnswerStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 1000,
  },
  async (ctx, {}) => {
    saveNoteAnswer({ ctx, noteFieldValue: { incorrectAnswer1: ctx.body } });
    return;
  },
  [saveIncorrectAnswer2StepFlow]
);

module.exports = { saveIncorrectAnswerStepFlow };
