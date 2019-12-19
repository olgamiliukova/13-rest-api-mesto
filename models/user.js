const mongoose = require('mongoose');
const validUrl = require('valid-url');

const { Schema } = mongoose;
// User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate(v) {
      return validUrl.isWebUri(v);
    },
    required: true,
  },
});
// User model
module.exports = mongoose.model('User', userSchema);
