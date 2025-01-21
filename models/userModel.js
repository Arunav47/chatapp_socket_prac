const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    image : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    status : {
        type : Boolean,
        default : false
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('user', userSchema);