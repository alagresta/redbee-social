var InterestModel = require('../models/interestModel');
var TwUtil = require('../utils/twitterUtils');
var TwitterModel = require('../models/twitterModel');
var userModel = require('../models/userModel');
var Async = require('async');

var poolTweets = {};
var CLASS = 'poolTweets :'


poolTweets.updateTweets= function(callback){
  var users =[];

  userModel.getUsers(function(error, data){
    if (typeof data !== 'undefined' && data.length > 0) {
      users=data;


  var calls = [];

        users.forEach(function(aUser) {
          calls.push(function(callback) {
            console.log('pooling for user '+ aUser.username);
            updateTweetByUser(aUser, function(error, data) {
              if (data) {
                //console.log(CLASS+"- Thread Tweet updated")
                callback(null, aTweet);
              }
            });
          })
        });
        Async.parallel(calls, function(err, result) {
          if (err) return console.log(CLASS+' - '+err);
        });
        // updateTweetByUser(users[i].id);
      }




  });

}


updateTweetByUser= function(aUser,callback){



  InterestModel.getUserSub(aUser.id, function(error, data) {
  // console.log(CLASS+' update Tweets for user id:'+ user_id);
    if (typeof data !== 'undefined' && data.length > 0) {
      tags = JSON.parse(JSON.stringify(data));


      for (i = 0; i < tags.length; i++) {
        var aTag =tags[i].tag;
        TwUtil.tweetsByTag(aTag, '', function(error, data) {
          if (data) {

            var tweets = [];
            for (var j = 0; j < data.length; j++) {


if(data[j].oEmbed){
              var newTweet = {
                id : data[j].id_str,
                userid : aUser.id,
                tag : data[j].userTag,
                created_at : data[j].created_at,
                oEmbed : data[j].oEmbed.html,
                string_id: data[j].id,
              }
              tweets.push(newTweet);

            }
            }

            var calls = [];
            tweets.forEach(function(aTweet) {
              calls.push(function(callback) {
                TwitterModel.insertTweet(aTweet, function(error, data) {
                  if (data) {
                    //console.log(CLASS+"- Thread Tweet updated")
                    callback(null, aTweet);
                  }
                });
              })
            });
            Async.parallel(calls, function(err, result) {
              if (err) return console.log(CLASS+' - '+err);
            });

          } else {
            console.log(CLASS+'- no tweets by tag');
          }
        });
      }

      callback();
    } else {  console.log(CLASS+"- no user subscriptions");  }
  });

}
module.exports = poolTweets;
