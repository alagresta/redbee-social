// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var apiRootURL = '/api';


//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port




//ROUTES IMPORT  -------------------------------
var index = require('./routes/index');
var tweets = require('./routes/tweets');




//REGISTER OUR ROUTES -------------------------------
app.use(apiRootURL, index);
app.use(apiRootURL+'/tweets', tweets);




// more routes for our API will happen here

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Rest api started at:  ' + port);