// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var apiRootURL = '/api';
var path = require('path');

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port




//ROUTES IMPORT  -------------------------------
var index = require('./routes/index');
var tweets = require('./routes/social/tweets');
var users = require('./routes/users');
//var instagram = require('./routes/social/instagram');
var interests = require('./routes/interests');

//REGISTER OUR ROUTES -------------------------------
app.use('/', index);
app.use(apiRootURL+'/tweets', tweets);
app.use(apiRootURL, users);
app.use(apiRootURL, interests);


//serve static assets from the public directory
app.use(express.static(path.join(__dirname, 'public')));

//look for view html in the views directory
app.set('views', path.join(__dirname, 'views'));
//use ejs to render 
app.set('view engine', 'ejs');

// more routes for our API will happen here
module.exports = app;

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Rest api started at:  ' + port);