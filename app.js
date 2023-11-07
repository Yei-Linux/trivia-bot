const { initializeCache, initializeDBClient, logger } = require('./src/config');
const { startup } = require('./src/startup');

const main = async () => {
  try {
    startup();
    await initializeDBClient();
    initializeCache();
  } catch (error) {
    logger.error(error.message);
  }
};

main();
