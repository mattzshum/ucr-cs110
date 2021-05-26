const mongoose = require('Mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    contents:{
        type:String,
        required:true,
    },
    dateOfEntry:{
        type:Date,
        default:Date.now()
    }
})
module.exports = Item = mongoose.model('Message', MessageSchema);