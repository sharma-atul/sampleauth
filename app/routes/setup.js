var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');

// API ROUTES
router.route('/')
.post(function(req, res) {
  //create hashed password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      // create a sample user
      var user = new User({
        name: req.body.name,
        password: hash,
        admin: false
      });

      // save the sample user
      user.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
      });
    });
  });
});

module.exports = router;
