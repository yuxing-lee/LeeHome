const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const config = require('../config/database');
const User = require('../models/User.model.js');

const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);

router.post('/signup', function (req, res) {
    if (!req.body.username || !req.body.password) {
        res.send('Please pass username and password.');
    } else {
        User.findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                User.create(req.body, function (err) {
                    if (err) {
                        res.status(400).send('Create ERROR.');
                    }
                    res.send('Successful created new user.');
                });
            }
            else
                res.status(400).send('Username already exists.');
        });
    }
});

router.post('/signin', function (req, res) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user)
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toJSON(), process.env.secretKey ? process.env.secretKey : config.secret, { expiresIn: '1h' });
                    res.send(token);
                } else
                    res.status(401).send('Authentication failed. Wrong password.');
            });
        }
    });
});

router.post('/checkJWT', function (req, res, next) {
    let token = req.body.token
    if(!token)
        res.send(false);
    else
        jwt.verify(token, process.env.secretKey ? process.env.secretKey : config.secret, function (err, decoded) {
            if (err || !decoded) res.send(false)
            res.send(true);
        });
});

module.exports = router;
