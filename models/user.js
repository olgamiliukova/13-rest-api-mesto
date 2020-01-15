const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const validator = require('validator');

const { Schema } = mongoose;
// User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(v) {
      return validator.isEmail(v);
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
  },
  salt: {
    type: String,
    required: true,
    default: bcrypt.genSaltSync(),
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
// make password hash instead plain one
// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync([this.password, this.salt].join(), 10);
  next();
});
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare([password, user.salt].join(), user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user;
        });
    });
};
// User model
module.exports = mongoose.model('User', userSchema);
