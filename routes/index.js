var express = require('express');
var InterestModel = require('../models/interestModel');
var TwUtil = require('../utils/twitterUtils');
var TwitterModel = require('../models/twitterModel');
var Async = require('async');

var router = express.Router();

/* GET home page. */
router.get('/init/:userid', function(req, res) {
	// res.render('index', { title: 'Angular, Node and Twitter API' });
	// res.json({ message: 'wellcome to social feed api' }); 

	var tags = [];
	var query = '';
	InterestModel.getUserSub(req.params.userid, function(error, data) {
		//si el usuario existe lo mostramos en formato json
		if (typeof data !== 'undefined' && data.length > 0) {
			tags = JSON.parse(JSON.stringify(data));

			console.log(tags);
			for (i = 0; i < tags.length; i++) {
				
				var aTag =tags[i].tag;
//				var query = TwUtil.getUserOrTagQuery(atag);

				console.log(aTag);

				TwUtil.tweetsByTag(aTag, '', function(error, data) {
					

					if (data) {


						var tweets = [];
						for (var j = 0; j < data.length; j++) {

							var newTweet = {
								id : data[j].id,
								userid : 1,
								tag : data[j].userTag,
								created_at : data[j].created_at,
								oEmbed : data[j].oEmbed.html,
							}
							tweets.push(newTweet);


						}


						var calls = [];

						tweets.forEach(function(aTweet) {
							calls.push(function(callback) {
								TwitterModel.insertTweet(aTweet, function(error, data) {
									if (data) {
										console.log("OK")
										callback(null, aTweet);
									}
								});

							}
							)
						});

						Async.parallel(calls, function(err, result) {
							/* this code will run after all calls finished the job or
							   when any of the calls passes an error */
							if (err)
								return console.log(err);
						// console.log(result);
						});


						res.json(tweets);






					} else {
						res.json(500, {
							"msg" : "Error"
						});
					}
				});

			}







		}
		//en otro caso mostramos una respuesta conforme no existe
		else {
			res.json(404, {
				"msg" : "notExist"
			});
		}
	});





});

router.get('/', function(req, res) {
	 res.render('index', { title: 'Angular, Node and Twitter API' });
	});

module.exports = router;