const isEmpty = require('./is-empty');
const Validator = require('validator')

module.exports = function validateLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


   if(Validator.isEmpty(data.email)){
       errors.email = 'email is empty'
        
   }

   if(Validator.isEmpty(data.password)){
    errors.password = 'password is empty'
}

 if(!Validator.isEmail(data.email)){
    errors.email = 'it must be an email'
}

return {
    errors,
    isValid: isEmpty(errors)
}
}