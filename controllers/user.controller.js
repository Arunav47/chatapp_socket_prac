const userSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const register = function(req, res) {
    try {
        res.render('register');
    } catch (error) {
        console.log(error.message);
    }
}

const registerUser = async function(req, res) {
    try {
        let user = await userSchema.findOne({email : req.body.email})
        if(user){
            res.redirect('/user/login');
        }
        else {
            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(req.body.password, salt, async function(err, hash){
                    if(err) throw err;
                    else{
                        const user = await userSchema.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash,
                            image: 'images/' + req.file.filename
                        });
                        jwt.sign({username : user.username, user_id : user._id}, process.env.JWT_SECRET, function(err, token){
                            if(err) throw err;
                            else{
                                res.cookie('token', token)
                                res.redirect('/chat/connects');
                            }
                        })
                    }
                })
            })
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

const login = function(req, res){
    try {
        res.render('login');
    }
    catch (error){
        console.log(error.message);
    }
}

const loginUser = async function(req, res){
    try {
        const user = await userSchema.findOne({email : req.body.email});
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result){
                if(err) throw err;
                else if(result){
                    jwt.sign({username : user.username, user_id : user._id}, process.env.JWT_SECRET, function(err, token){
                        if(err) throw err;
                        else{
                            res.cookie('token', token);
                            res.redirect('/chat/connects');
                        }
                    })  
                }
                else{
                    res.redirect('/user/login');
                }
            })
        }
        else{
            res.redirect('/user/login');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

const logout = function(req, res) {
    try {
        res.clearCookie('token');
        res.redirect('/user/login');
    } catch (error) {
        console.log(error.message);
    }
}

const getProfile = function(req, res) {
    try {
        console.log(`Prof${req.user}`);
        res.render('profile', { user: req.user });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    register,
    registerUser,
    login,
    loginUser,
    logout,
    getProfile
}