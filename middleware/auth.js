const jwt = require('jsonwebtoken');
const userSchema = require('../models/userModel');

const authenticate = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/user/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userSchema.findById(decoded.user_id);
        if (!user) {
            return res.redirect('/user/login');
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.redirect('/user/login');
    }
};

module.exports = authenticate;
