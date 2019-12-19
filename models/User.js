const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys')
const Task = require('../models/Task')
const userSchema = mongoose.Schema({
    name : {
        required: true,
        type: String
    },
    email : {
        required: true,
        type: String,
        unique: true
    },
    password : {
        required: true,
        type: String
    },
    token: {
        type: String
    }
},
{timeStamp: true}
)
userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField:'author'
})
userSchema.statics.findByCredentials = async function findByCredentials(email,password){
    const user = await User.findOne({email});

   if(!user){
    errors.email = 'email incorret'
    return res.status(400).json(errors)
   }

   const passwordMatch = await bcrypt.compareSync(password,user.password)

   if(!passwordMatch){
    errors.password = 'password incorret'
    return res.status(400).json(errors)
}

   return user;
}

userSchema.methods.generateAuth = async function generateAuth(){
  const user = this;
  const payload = {
      name: user.name,
      email:user.email,
      _id: user._id
  }
  const token = jwt.sign({payload},keys.jwt_secret,{ expiresIn: '1h' });
  user.token = token;
  
  user.save()
  return token;
}


userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
    }

    next()
})


userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({author: user._id})

    next()
})
const User = mongoose.model('User',userSchema);

module.exports = User;