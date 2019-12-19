const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'password needs to between 6 and 20 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};



