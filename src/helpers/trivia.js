const { cache } = require('../config');

const buildTriviaCache = (triviaApiResponse) => {
  try {
    return triviaApiResponse.map(
      ({ question, correct_answer, incorrect_answers }, index) => ({
        question: `Question ${index + 1}: ${question}`,
        title: 'Choose one',
        rows: [correct_answer, ...incorrect_answers].map((answer, index) => ({
          id: `ID_${index + 1}`,
          title: answer,
          description: '',
        })),
      })
    );
  } catch (error) {
    return [];
  }
};

const saveTriviaToCache = (phone, triviaApiResponse) => {
  const trivia = buildTriviaCache(triviaApiResponse);
  cache().upsertStore(phone, { trivia });
};

module.exports = { saveTriviaToCache };
