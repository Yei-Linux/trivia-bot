const { dbClient, logger } = require('../../config');

const findUserByPhone = async (phone) => {
  try {
    const res = await dbClient();
    const user = await res.db.collection('users').findOne({ phone });

    return user;
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { findUserByPhone };
