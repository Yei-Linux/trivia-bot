const trivia = {
  response_code: 0,
  results: [
    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Which of the General Mills Corporation monster cereals was the last to be released in the 1970s?',
      correct_answer: 'Fruit Brute',
      incorrect_answers: ['Count Chocula', 'Franken Berry', 'Boo Berry'],
    },
    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Where does water from Poland Spring water bottles come from?',
      correct_answer: 'Maine, United States',
      incorrect_answers: [
        'Hesse, Germany',
        'Masovia, Poland',
        'Bavaria, Poland',
      ],
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'medium',
      question: 'Haggis is traditionally ate on Burns Night.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    },
    {
      category: 'General Knowledge',
      type: 'boolean',
      difficulty: 'medium',
      question:
        'Instant mashed potatoes were invented by Canadian Edward Asselbergs in 1962.',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    },
    {
      category: 'General Knowledge',
      type: 'multiple',
      difficulty: 'medium',
      question: 'The Mexican Beer Corona is what type of beer?',
      correct_answer: 'Pale Lager',
      incorrect_answers: ['India Pale Ale', 'Pilfsner', 'Baltic Porter'],
    },
  ],
};

module.exports = { trivia };
