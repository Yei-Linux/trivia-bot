const { EVENTS } = require('@bot-whatsapp/bot');

const VIEW_MY_NOTES_FLOW = {
  getNotesLinkStep: {
    keywords: ['View my notes 📖'],
    questions: [`This is the link to your notes: `],
  },
};

const SAVE_NOTE_FLOW = {
  saveQuestionNoteStep: {
    keywords: ['Save Note 📚'],
    questions: [`Please, give a question to your note`],
  },
  saveAnswerNoteStep: {
    keywords: [],
    questions: [`Now give an answer to your note`],
  },
  saveIncorrectAnswer1NoteStep: {
    keywords: [],
    questions: [`Now give an incorrect answer to your note`],
  },
  saveIncorrectAnswer2NoteStep: {
    keywords: [],
    questions: [`Now give another incorrect answer to your note`],
  },
  saveIncorrectAnswer3NoteStep: {
    keywords: [],
    questions: [`One more 😬`],
    answers: [
      'Great, your note has been saved 🎉. Now you can view it selecting "View my notes"',
    ],
  },
};

const TRIVIA_FLOW = {
  question1Step: {
    keywords: ['Trivia 💡'],
    questions: [
      'What should be the answer?🤔',
      'Please select the correct one 😄',
    ],
  },
  question2Step: {
    keywords: ['ID_1', 'ID_2', 'ID_3', 'ID_4'],
    questions: [
      'What should be the answer?🤔',
      'Please select the correct one 😄',
    ],
  },
  question3Step: {
    keywords: ['ID_1', 'ID_2', 'ID_3', 'ID_4'],
    questions: [
      'What should be the answer?🤔',
      'Please select the correct one 😄',
    ],
  },
  question4Step: {
    keywords: ['ID_1', 'ID_2', 'ID_3', 'ID_4'],
    questions: [
      'What should be the answer?🤔',
      'Please select the correct one 😄',
    ],
  },
  lastQuestionStep: {
    keywords: ['ID_1', 'ID_2', 'ID_3', 'ID_4'],
    questions: [
      'What should be the answer?🤔',
      'Please select the correct one 😄',
    ],
    answers: ['Great, the trivia was completed 🎉.'],
  },
};

const TRIVIA_CONVERSATION_BOT = {
  welcomeStep: {
    keywords: [EVENTS.WELCOME],
    questions: [
      `Welcome to Trivia Bot.😄`,
      `Welcome back to Trivia Bot,{{name}}!😄`,
    ],
  },
  fullNameStep: {
    keywords: [],
    questions: ['Can you please tell me your name? '],
  },
  emailStep: {
    keywords: [],
    questions: ['What is your email?'],
  },
  menuStep: {
    keywords: [],
    questions: ['What would you like to do?'],
    buttons: [
      { body: 'Trivia 💡' },
      { body: 'Save Note 📚' },
      { body: 'View my notes 📖' },
    ],
  },
  ...VIEW_MY_NOTES_FLOW,
  ...SAVE_NOTE_FLOW,
  ...TRIVIA_FLOW,
};

module.exports = { TRIVIA_CONVERSATION_BOT };
