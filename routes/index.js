var express = require('express');
var InterestModel = require('../models/interestModel');
var TwUtil = require('../utils/twitterUtils');
var TwitterModel = require('../models/twitterModel');
var Async = require('async');

var router = express.Router();

/* GET home page. */
router.get('/init/:userid', function(req, res) {

	var tags = [];
	var query = '';
	var userId=req.params.userid;

	InterestModel.getUserSub(userId, function(error, data) {

		if (typeof data !== 'undefined' && data.length > 0) {
			tags = JSON.parse(JSON.stringify(data));

			console.log(tags);
			for (i = 0; i < tags.length; i++) {
				var aTag =tags[i].tag;
				console.log(aTag);

				TwUtil.tweetsByTag(aTag, '', function(error, data) {
					if (data) {

						var tweets = [];
						for (var j = 0; j < data.length; j++) {

							var newTweet = {
								id : data[j].id_str,
								userid : userId,
								tag : data[j].userTag,
								created_at : data[j].created_at,
								oEmbed : data[j].oEmbed.html,
									string_id: data[j].id
							}
						tweets.push(newTweet);
						}

						var calls = [];
						tweets.forEach(function(aTweet) {
							calls.push(function(callback) {
								TwitterModel.insertTweet(aTweet, function(error, data) {
									if (data) {

										callback(null, aTweet);
									} else {
										callback(null, '');
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
		else {
			res.json(404, {
				"msg" : "notExist"
			});
		}
	});
});

router.get('/', function(req, res) {
	 res.render('index', { title: 'Twitter Dashboard' });
	});

module.exports = router;
