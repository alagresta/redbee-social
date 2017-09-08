// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var scheduler  = require('node-schedule');
var appConfig = require('./config.sample');
var poolTweets = require('./utils/poolTweets');
var apiRootURL = '/api';
var path = require('path');



//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//var port = process.env.PORT || 8080;        // set our port
function initIPAdress() {
    var adr = process.env.OPENSHIFT_NODEJS_IP;
    if (typeof adr === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
            adr = 'localhost';
    }

    ipaddress = adr;
}


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
// var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';




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
//app.listen(port);
initIPAdress();

app.listen(server_port, server_ip_address, function () {
	  console.log( "Listening on " + server_ip_address + ", port " + server_port )
	});


//console.log('Rest api started at:  ' + port);

var int = 1;

var montlyJob = scheduler.scheduleJob(appConfig.schedulerConfig.timeConfig, function(){
  console.log('starting scheduleJob...');
 poolTweets.updateTweets();
});
