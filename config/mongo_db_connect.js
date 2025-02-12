const mongoose = require('mongoose');

// Connect to MongoDB
function connectDB(mongourl){
    mongoose.connect(mongourl)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });
}

module.exports = connectDB;