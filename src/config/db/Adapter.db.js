const { logger } = require('../logger');

class AdapterDB {
  adapterConnection;

  constructor(adapterConnection) {
    this.adapterConnection = adapterConnection;
  }

  /**
   * Initializes and return the provider connection(MONGODB, POSTGRES, etc).
   *
   * @return {Promise} - A promise that resolves with the response from the adapter connection initialization.
   */
  async init() {
    if (!this.adapterConnection) return;
    try {
      const response = await this.adapterConnection.init();
      logger.info('✔️ Correct DB Connection');
      return response;
    } catch (error) {
      logger.info('❌ Wrong DB Connection');
      throw new Error(error);
    }
  }
}

module.exports = {
  AdapterDB,
};
