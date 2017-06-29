var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var User = require('../models/user');

var config = require('../../config');

var router = express.Router();
// API ROUTES


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.route('/')
.post(function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      //compare user password with the hashed version from db.
      bcrypt.compare(req.body.password, user.password, function(err, validated) {
        if(validated) {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, config.secret, {
            expiresIn: 3600 // expires in 1 hour
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        } else {
         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        }
      });//end of bcrypt
    }

  });
});
module.exports = router;
