const Joi = require('joi');

const User = require('./user');
// Card validator
module.exports = Joi.object({
  _id: Joi.string().alphanum().length(24),
  name: Joi.string().required().min(2).max(30),
  link: Joi.number().integer().required().min(18),
  likes: Joi.array().items(User),
});
