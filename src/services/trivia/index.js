const findOne = require("./find-one");
const saveAnswer = require("./save-answer");

module.exports = {
  ...findOne,
  ...saveAnswer,
};
