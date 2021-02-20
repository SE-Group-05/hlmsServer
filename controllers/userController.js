var express = require('express');
var router = express.Router();

var Users = require('../models/users');
var passport = require('passport');
var authenticate = require('../middleware/authenticate');


const signupAdmin = (req, res, next) => {
    var admin = {
        username: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: 'admin'
    }
    Users.register(new Users(admin),
        req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, status: 'Registration Unsuccessful!' });
            }
            else {
                if (req.body.firstname)
                    user.firstname = req.body.firstname;
                if (req.body.lastname)
                    user.lastname = req.body.lastname;
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: false, status: 'Registration unsuccessful!' });
                        return;
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({ success: true, status: 'Registration Successful!' });
                });
            }
        });
}

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        // if (err)
        //     return next(err);

        if (!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, status: 'Login Unsuccessful!', err: info });
        }
        req.logIn(user, (err) => {
            if (err) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!' });
            }
            var token = authenticate.getToken({ _id: req.user._id, role: user.role });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Login Successful!', token: token, });
        });
    })(req, res, next);
}

const changePassoword = (req, res, next) => {
    var userId = req.params.id;
    Users.findById(userId).then(function (sanitizedUser) {
        if (sanitizedUser) {
            sanitizedUser.setPassword(newPasswordString, function () {
                sanitizedUser.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, message: 'password reset successful' });
            });
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, message: 'This user does not exist' });
        }
    }, function (err) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, message: 'Error while updating Password' });
    });
}



const logout = (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
    }
}

const checkJWTtoken = (req, res) => {
    verifyUser((err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            return res.json({ status: 'JWT invalid!', success: false, err: info });
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({ status: 'JWT valid!', success: true, user: user });

        }
    })(req, res);
}

exports.signupAdmin = signupAdmin;
exports.login = login;
exports.logout = logout;
exports.changePassoword = changePassoword;
exports.checkJWTtoken = checkJWTtoken;