const { AdapterDB } = require('./Adapter.db');
const { MongoDb } = require('./Mongo.db');

const { MONGO_DB_URI, MONGO_DB_NAME } = require('./Env.db');

class SingletonDB {
  static instance;
  static client;

  static async init(adapterConnection) {
    if (SingletonDB.client) {
      return null;
    }

    try {
      const adapterClient = await new AdapterDB(adapterConnection).init();
      SingletonDB.client = adapterClient;
    } catch (error) {
      throw new Error(error);
    }
  }

  constructor() {}
}

/**
 * Initializes the DB client.
 *
 * @return {Promise<void>} A promise that resolves when the DB client is initialized.
 */
async function initializeDBClient() {
  const adapterConnection = new MongoDb({
    dbUri: MONGO_DB_URI,
    dbName: MONGO_DB_NAME,
  });

  await SingletonDB.init(adapterConnection);
}

async function dbClient() {
  const client = SingletonDB.client;
  return client;
}

module.exports = {
  initializeDBClient,
  dbClient,
};
