const mongoose = require('mongoose');


const taskSchema = mongoose.Schema({
    title : {
        required: true,
        type: String
    },
    
    completed : {
        type: Boolean,
        default: false
      
    },
    author: {
     type: mongoose.Types.ObjectId,
     required: true,
     ref: 'User'
    }
},
{timeStamp: true}
)




const Task = mongoose.model('Task',taskSchema);

module.exports = Task;