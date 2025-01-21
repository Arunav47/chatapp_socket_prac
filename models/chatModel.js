const mongoose = require('mongoose');

// Chat Schema
const chatSchema = new mongoose.Schema({
    sender_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    receiver_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    type : {
        type : String,
        required : true
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('chat', chatSchema);