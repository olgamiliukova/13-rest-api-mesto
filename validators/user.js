const Joi = require('joi');
// User validator
module.exports = Joi.object({
  _id: Joi.string().alphanum().length(24),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
  name: Joi.string().required().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.number().integer().required().min(18),
});
