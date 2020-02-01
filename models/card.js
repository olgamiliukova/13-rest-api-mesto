const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;
const userSchema = {
  type: Schema.Types.ObjectId,
  ref: 'User',
};
// Card schema
const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate(value) {
      return validator.isUrl(value);
    },
    required: true,
  },
  owner: {
    ...userSchema,
    required: true,
  },
  likes: {
    type: [userSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Card model
module.exports = mongoose.model('Card', cardSchema);
