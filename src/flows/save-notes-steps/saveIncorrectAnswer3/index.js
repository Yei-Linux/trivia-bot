const { addKeyword } = require('@bot-whatsapp/bot');

const { saveNoteAnswer } = require('../save-notes.answer');
const { saveNotes } = require('../../../services');
const { TRIVIA_CONVERSATION_BOT } = require('../../../constants');
const { cache } = require('../../../config');

const { saveIncorrectAnswer3NoteStep } = TRIVIA_CONVERSATION_BOT;
const { keywords, questions, answers } = saveIncorrectAnswer3NoteStep;
const [question1] = questions;

const saveIncorrectAnswer3StepFlow = addKeyword(keywords).addAnswer(
  question1,
  {
    capture: true,
    delay: 1000,
  },
  async (ctx, { flowDynamic }) => {
    saveNoteAnswer({ ctx, noteFieldValue: { incorrectAnswer3: ctx.body } });
    const phone = ctx.from;
    const noteCached = cache().get(phone).noteToSave;
    await saveNotes({ ...noteCached, phone });
    await flowDynamic(answers);
    return;
  },
  []
);

module.exports = { saveIncorrectAnswer3StepFlow };
