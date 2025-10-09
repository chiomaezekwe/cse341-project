const validate = require('validate.js');

const bookConstraints = {
  title: {
    presence: true,
    length: { minimum: 1 }
  },
  author: {
    presence: true,
    length: { minimum: 1 }
  },
  genre: { presence: false },
  publishedYear: {
    numericality: {
      onlyInteger: true,
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: new Date().getFullYear()
    }
  },
  ISBN: { presence: false },
  language: { presence: false },
  summary: { presence: false }
};

const validateBook = (data) => validate(data, bookConstraints);

module.exports = validateBook;
