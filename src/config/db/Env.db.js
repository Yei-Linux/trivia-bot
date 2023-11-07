const {
  CONSTANTS: {
    MONGO_VARIATONS: {
      MONGO_DB_NAME,
      MONGO_USER,
      MONGO_PASS,
      MONGO_CLUSTER_NAME,
    },
    APP: { ENV },
  },
} = require('../../constants');

const MONGO_VARIATONS = {
  local: `mongodb://host.docker.internal:27017/${MONGO_DB_NAME}?replicaSet=rs0&directConnection=true`,
  dev: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER_NAME}/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
  prod: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER_NAME}/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
};

module.exports = {
  MONGO_DB_URI: MONGO_VARIATONS[ENV ?? 'dev'],
  MONGO_DB_NAME,
};
