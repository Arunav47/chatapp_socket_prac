const mongoose = require('mongoose');

const getConnects = async function(req, res) {
    try {
        console.log("getConnects called");
        console.log("Current user ID:", req.user.user_id);
        let connects = await mongoose.model('user').find({ _id: { $ne: req.user.user_id } });
        connects = connects.filter((connect) => connect.username !== req.user.username);
        console.log(req.user)
        console.log("Connects found:", connects);
        res.render('connects', { connects: connects });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}


module.exports = {
    getConnects
}