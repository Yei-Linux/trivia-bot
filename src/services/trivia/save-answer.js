const { dbClient } = require("../../config/db");
const { getTriviaAnswerText } = require("../../helpers");

const saveAnswer = async ({ question, answer, questionNumber, phone }) => {
  try {
    const res = await dbClient();
    const answerText = getTriviaAnswerText(questionNumber - 1, answer);
    await res.db.collection("answers").insertOne({
      questionNumber,
      question,
      answerId: answer,
      answer: answerText,
      phone,
      date: new Date(),
    });
  } catch (error) {
    logger.error(error.message);
    throw new Error("Error", error);
  }
};

module.exports = { saveAnswer };
