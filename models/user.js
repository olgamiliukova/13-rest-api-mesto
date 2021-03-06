const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');

const { BadRequestError } = require('../errors');

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
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 30,
    select: false,
  },
  salt: {
    type: String,
    required: true,
    default: () => bcrypt.genSaltSync(),
    select: false,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: (props) => `${props.value} is not a valid uri`,
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
userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .select('+salt')
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Incorrect email or password');
      }

      return bcrypt.compare([password, user.salt].join(), user.password)
        .then((matched) => {
          if (!matched) {
            throw new BadRequestError('Incorrect email or password');
          }

          return user;
        });
    });
};
// User model
module.exports = mongoose.model('User', userSchema);
