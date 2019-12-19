const mongoose = require('mongoose');
const key = require('../config/keys')
module.exports = mongoose.connect(key.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true  },(err)=>{
   if(err){
     return console.log(err)
   }
   return console.log('success')
})

