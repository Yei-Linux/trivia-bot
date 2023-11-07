const { dbClient } = require('../../config/db');

const saveNotes = async ({
  question,
  answer,
  incorrectAnswer1,
  incorrectAnswer2,
  incorrectAnswer3,
  phone,
}) => {
  try {
    const res = await dbClient();
    await res.db.collection('notes').insertOne({
      question,
      answer,
      incorrectAnswer1,
      incorrectAnswer2,
      incorrectAnswer3,
      phone,
      date: new Date(),
    });
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { saveNotes };
