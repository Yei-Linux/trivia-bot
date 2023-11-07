const { dbClient, logger } = require('../../config');
const { getTimestamp } = require('../../helpers');

const updateUser = async (phone, set) => {
  const lastInteraction = getTimestamp();

  try {
    const res = await dbClient();
    await res.db
      .collection('users')
      .updateOne(
        { phone },
        { $set: { ...set, lastInteraction } },
        { upsert: true }
      );
  } catch (error) {
    logger.error(error.message);
    throw new Error('Error', error);
  }
};

module.exports = { updateUser };
