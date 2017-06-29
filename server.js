// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model

var setup = require('./app/routes/setup');
var users = require('./app/routes/users');
var authenticate = require('./app/routes/authenticate');
var Verify = require('./app/routes/verify');
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to db server");
});

app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console;
app.use(morgan('dev'));


//register routes with route handlers
app.use('/api/setup', setup);
app.use('/api/users', users)
app.use('/api/authenticate', authenticate)


// basic route
app.route('/')
.get(Verify.verifyUser, function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

//error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
