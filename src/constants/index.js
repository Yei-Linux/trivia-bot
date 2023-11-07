require('dotenv').config();
const { trivia } = require('./trivia');
const { TRIVIA_CONVERSATION_BOT } = require('./conversation');

const MONGO_VARIATONS = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASS: process.env.MONGO_PASS,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  MONGO_CLUSTER_NAME: process.env.MONGO_CLUSTER_NAME,
};

const APP = {
  PORT: Number(process.env.PORT ?? '3000'),
  ENV: process.env.ENV,
};

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION = 2 * HOUR;
const DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION =
  5 * MINUTE;

const CONFIG = {
  MINUTE,
  HOUR,
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION,
  DIFF_MILISECONDS_ALLOWED_FROM_LAST_INTERACTION_WHEN_FINISHED_CONVERSATION,
};

const META = {
  META_TOKEN: process.env.META_TOKEN,
  META_NUMBER_ID: process.env.META_NUMBER_ID,
  META_VERIFY_TOKEN: process.env.META_VERIFY_TOKEN,
};

const MESSAGES = {
  MONGODB_CREDENTIALS_ERROR: 'Credentials must have dbName and dbUri',
  INVALID_EMAIL:
    'Im sorry but your email is not valid. Remember to use this format: email@domain.com',
  INVALID_OPTION:
    'Im sorry but I could not understand, option is invalid. Dont forget to put the correct one!',
};

const CONSTANTS = {
  MONGO_VARIATONS,
  APP,
  MESSAGES,
  META,
  CONFIG,
};

module.exports = { CONSTANTS, TRIVIA_CONVERSATION_BOT, trivia };
