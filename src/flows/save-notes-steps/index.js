const { addKeyword } = require('@bot-whatsapp/bot');

const { saveNoteAnswer } = require('./save-notes.answer');
const { TRIVIA_CONVERSATION_BOT } = require('../../constants');
const { saveAnswerStepFlow } = require('./saveAnwser');

const { saveQuestionNoteStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions } = saveQuestionNoteStep;
const [question1] = questions;

const saveNotesStepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 1000,
  },
  async (ctx, {}) => {
    saveNoteAnswer({ ctx, noteFieldValue: { question: ctx.body } });
    return;
  },
  [saveAnswerStepFlow]
);

module.exports = { saveNotesStepFlow };
