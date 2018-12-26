const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/Book.model.js');
const verification = require('../services/verification.js')

const passport = require('passport');
require('../config/passport')(passport);

/* GET ALL BOOKS */
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
    Book.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

/* GET SINGLE BOOK BY ID */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Book.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* SAVE BOOK */
router.post('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  console.log(req.body)
    Book.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* UPDATE BOOK */
router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Book.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

/* DELETE BOOK */
router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    Book.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

module.exports = router;
