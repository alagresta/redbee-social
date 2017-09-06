/**
* @author A.Lagresta
* @name Tweet utils class
* created on 17.8.2017
* @description contains common methods to make twitter api queries
*/

var Twit = require('twit');
var config = require('../config.sample');

// instantiate Twit module
var twitter = new Twit(config.twitter);

var TWEET_COUNT = 10;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';
var SEARCH_URL = 'search/tweets';


//creo un objeto para ir almacenando todo
var twitterUtils = {};

//obtenemos un usuario por su id
twitterUtils.tweetsByTag= function(atag,sinceID,maxID,callback)
{

	var oEmbedTweets = [];
	var tweets = [];
	var q= this.getUserOrTagQuery(atag);
	var params =  { 'q':q , 'count': TWEET_COUNT , 'max_id':maxID, 'since_id':sinceID };

	twitter.get(SEARCH_URL, params, function (err, data, resp) {

		if (true) {
			tweets = data.statuses;

			var i = 0, len = tweets.length;
			for(i; i < len; i++) {
				tweets[i].userTag=atag;
				getOEmbed(tweets[i]);
			}
			/**
			* requests the oEmbed html
			*/
			function getOEmbed (tweet) {

				// oEmbed request params
				var params = { "id": tweet.id_str, "maxwidth": MAX_WIDTH, "hide_thread": true, "omit_script": true};
				// request data
				twitter.get(OEMBED_URL, params, function (err, data, resp) {
					tweet.oEmbed = data;
					oEmbedTweets.push(tweet);

					// do we have oEmbed HTML for all Tweets?
					if (oEmbedTweets.length == tweets.length) {
						callback ("OK", oEmbedTweets);
					}
				});
			}
		} else {
			console.log('no data retrived from twitter API');
		}
	});

}

twitterUtils.generateQuery = function(interests) {
	var query =[];
	for (i=0; i<interests.length; i++) {
		console.log(interests[i].tag);
		if ((interests[i].tag).slice(0, 1)=='#') {
			query.push(interests[i].tag);
		} else {

		}
	}
	return query.join(" OR ");
}


twitterUtils.getUserOrTagQuery = function(tag) {
	if (tag.slice(0, 1)=='#') {
		return tag;
	} else {
		return 'from: '+tag;
	}
}
module.exports = twitterUtils;
