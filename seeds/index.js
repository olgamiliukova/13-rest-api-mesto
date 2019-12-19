const cards = require('./cards.json');
const users = require('./users.json');

module.exports = [
  {
    model: 'Card',
    documents: cards,
  },
  {
    model: 'User',
    documents: users,
  },
];
