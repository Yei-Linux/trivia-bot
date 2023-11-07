const trivia = require('./trivia');

const getCurrentDate = () => {
  const currentDate = new Date();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = (currentDate.getDay() + 1).toString().padStart(2, '0');

  const format = `${currentDate.getFullYear()}-${month}-${day}T${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}.000Z`;

  return format;
};

const getTimestamp = () => new Date().getTime();

const delay = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, time);
  });
};

module.exports = {
  delay,
  getCurrentDate,
  getTimestamp,
  ...trivia,
};
