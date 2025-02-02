const { cache } = require("../config");
const { trivia } = require("../constants");

const buildTriviaCache = (triviaApiResponse) => {
  try {
    return triviaApiResponse.map(
      ({ question, correct_answer, incorrect_answers }, index) => ({
        question: `Question ${index + 1}: ${question}`,
        title: "Choose one",
        rows: [correct_answer, ...incorrect_answers].map((answer, index) => ({
          id: `ID_${index + 1}`,
          title: answer,
          description: "",
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

const getTriviaAnswerText = (questionIndex, answerId) => {
  try {
    const question = trivia.results[questionIndex];
    const answers = [question.correct_answer, ...question.incorrect_answers];
    const [, answerIndex] = answerId.split("_");
    const answerIndexNum = Number(answerIndex) - 1;

    return answers[answerIndexNum];
  } catch (error) {
    return "";
  }
};

module.exports = { saveTriviaToCache, getTriviaAnswerText };
