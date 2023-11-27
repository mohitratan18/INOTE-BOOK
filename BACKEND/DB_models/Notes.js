const mongoose = require('mongoose');
const Noteschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required : true
    },
    description:{
        type:String,
        require:true,
    },
    date:{
        type: Date,
        default: Date.now,
        require:true,
    }
})
module.exports = mongoose.model('notes',Noteschema);