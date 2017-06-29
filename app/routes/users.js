var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/user');

var Verify = require('./verify');
// API ROUTES


// route to return all users (GET http://localhost:8080/api/users)
router.route('/')
.get(Verify.verifyUser, function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });

module.exports = router;
