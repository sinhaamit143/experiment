//----importing packages----
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const cookieSession = require('cookie-session')
require('../config/passport-setup');

//----importind user.js from models----
const User = require('../models/user');

//
exports.user_test = (req, res, next) => {
    res.status(200).json({
        message : "heloooooo"
    });
}
//----controller route for signup ----
exports.user_signup = (req, res, next) => {
    User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length >= 1) {         
                //409 or 422 
                return res.status(409).json({
                message: "Email already exists"
                });
            }else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            m_num: req.body.m_num,
                            email: req.body.email,
                            password: hash
                        });
                        user
                        .save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({
                                 message: "User Created Successfully"
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });

                            });

                    }

                });

            }
        });
}

//----controller route for login ----
exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log(user);
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }

            else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id

                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "120000"
                            }
                            
                        );
                        return res.status(200).json({
                            message: 'Auth Successful',
                            token: token
                        });
                    };
                    
                    return res.status(401).json({
                        message: "Auth Failed"

                    });
                });

            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
} 

//----login for google user ----
exports.user_google = (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] });
    res.status(200).json({
        message : "helloo"
    });
}

//----controller route for deleting a user ----
exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}