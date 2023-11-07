const NodeCache = require('node-cache');
const { logger } = require('../logger');

class SingletonCache {
  static cache;

  /**
   * Initializes the cache if it has not been initialized yet.
   *
   * @return {null} Returns null if the cache has already been initialized.
   * @throws {Error} Throws an error if there is an issue with cache initialization.
   */
  static init() {
    if (SingletonCache.cache) {
      return null;
    }

    try {
      const cache = new NodeCache({ deleteOnExpire: false });
      SingletonCache.cache = cache;
      logger.info('✔️ Correct Cache Initialization');
    } catch (error) {
      logger.info('❌ Wrong Cache Initialization');
      throw new Error(error);
    }
  }

  constructor() {}
}

/**
 * Initializes the cache.
 *
 * @return {null}
 */
function initializeCache() {
  SingletonCache.init();
}

/**
 * Returns an object with cache operations.
 *
 * @return {Object} An object with cache operations.
 */
function cache() {
  const store = SingletonCache.cache;
  return {
    ...store,
    upsertStore: (key, objToAdd = {}, cb = (storeValue) => storeValue) => {
      const elementCache = store.get(key) ?? {};
      const storeGot = cb(elementCache);
      store.set(key, { ...storeGot, ...objToAdd });
    },
  };
}

module.exports = {
  cache,
  initializeCache,
};
