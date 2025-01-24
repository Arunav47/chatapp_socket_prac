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

const registerUser = function(req, res) {
    try {
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, async function(err, hash){
                if(err) throw err;
                else{
                    jwt.sign({username : req.body.username, user_id : req.body.user_id}, process.env.JWT_SECRET, async function(err, token){
                        if(err) throw err;
                        else{
                            res.cookie('token', token)
                            const user = await userSchema.create({
                                username: req.body.username,
                                email: req.body.email,
                                password: hash,
                                image: 'images/' + req.file.filename
                            });
                            res.redirect('/chat/connects');
                        }
                    })
                }
            })
        })
        
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
                    jwt.sign({username : user.username, user_id : user.user_id}, process.env.JWT_SECRET, function(err, token){
                        if(err) throw err;
                        else{
                            res.cookie('token', token);
                            res.redirect('/chat/connects');
                        }
                    })  
                }
                else{
                    res.redirect('user/login');
                }
            })
        }
        else{
            res.redirect('user/login');
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

const logout = function(req, res) {
    try {
        res.clearCookie('token');
        res.redirect('user/login');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    register,
    registerUser,
    login,
    loginUser,
    logout
}