var express = require('express');
var InterestModel = require('../models/interestModel');
var TwUtil = require('../utils/twitterUtils');
var TwitterModel = require('../models/twitterModel');
var Async = require('async');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// res.render('index', { title: 'Angular, Node and Twitter API' });
	// res.json({ message: 'wellcome to social feed api' }); 

	var tags = [];
	var query = '';
	InterestModel.getUserSub(1, function(error, data) {
		//si el usuario existe lo mostramos en formato json
		if (typeof data !== 'undefined' && data.length > 0) {
			tags = JSON.parse(JSON.stringify(data));

			
			
			
			
			var query = TwUtil.getUserOrTagQuery(tags);


			TwUtil.tweetsByQ(query, '', function(error, data) {
				//si el usuario se ha insertado correctamente mostramos su info

				if (data) {


					var tweets =[];
					for(var i=0;i<data.length;i++){
						
						var newTweet = {
							id : data[i].id,
							userid : 1,
							tag : data[i].entities.hashtags,
							created_at : data[i].created_at,
							oEmbed : data[i].oEmbed.html,
						}
						tweets.push(newTweet);
						
									
					}
					
					
					var calls = [];

					tweets.forEach(function(aTweet){
					    calls.push(function(callback) {
					    	TwitterModel.insertTweet(aTweet, function(error, data) {
								if (data) {
									console.log("OK")
									 callback(null, aTweet);
								}
							});		
					    
					    }
					)});

					Async.parallel(calls, function(err, result) {
					    /* this code will run after all calls finished the job or
					       when any of the calls passes an error */
					    if (err)
					        return console.log(err);
					   // console.log(result);
					});
					

					res.json(data);


				



				} else {
					res.json(500, {
						"msg" : "Error"
					});
				}
			});


		}
		//en otro caso mostramos una respuesta conforme no existe
		else {
			res.json(404, {
				"msg" : "notExist"
			});
		}
	});





});



module.exports = router;