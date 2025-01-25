const mongoose = require('mongoose');

const getConnects = async function(req, res) {
    try {
        
        let connects = await mongoose.model('user').find({ _id: { $ne: req.user.user_id } });
        // console.log("Connects found:", connects);

        res.render('connects', {connects: connects, user: req.user});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}


module.exports = {
    getConnects
}