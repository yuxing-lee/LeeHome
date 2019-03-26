const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User.model.js');

const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config/passport')(passport);

router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.send('Please pass username and password.');
  } else {
    User.create(req.body, function (err) {
      if (err) {
        return res.send('Username already exists.' );
      }
      res.send('Successful created new user.' );
    });
  }
});

router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;
    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), process.env.secretKey, {expiresIn:'1h'});
          res.send('JWT ' + token );
        } else {
          res.status(401).send('Authentication failed. Wrong password.');
        }
      });
    }
  });
});

module.exports = router;
