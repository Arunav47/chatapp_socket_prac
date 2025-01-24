const express = require("express");
const jwt = require("jsonwebtoken");

const authCheck = function() {
    return function(req, res, next) {
        const token = req.cookies.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) {
                    res.status(401).json({ message: "Unauthorized" });
                    res.redirect('user/login');
                } else {
                    if (decoded) {
                        req.user = decoded;
                        console.log("User authenticated:", req.user);
                        next();
                    }
                }
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
            res.redirect('user/login');
        }
    };
};

module.exports = authCheck;