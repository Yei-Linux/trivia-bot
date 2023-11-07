const { MongoClient } = require('mongodb');
const { logger } = require('../logger');
const {
  CONSTANTS: {
    MESSAGES: { MONGODB_CREDENTIALS_ERROR },
  },
} = require('../../constants');

class MongoDb {
  client;
  credentials = {
    dbUri: '',
    dbName: '',
  };

  constructor(credentials) {
    if (!credentials) throw new Error(MONGODB_CREDENTIALS_ERROR);
    if (!credentials.dbUri || !credentials.dbName) {
      throw new Error(MONGODB_CREDENTIALS_ERROR);
    }

    this.credentials = credentials;
    this.init();
  }

  async init() {
    try {
      const client = new MongoClient(this.credentials.dbUri);
      await client.connect();
      this.client = client;
      return this;
    } catch (error) {
      logger.error(error.message);
      throw new Error('Error in connection', error);
    }
  }

  get db() {
    return this.client.db(this.credentials.dbName);
  }
}

module.exports = {
  MongoDb,
};
