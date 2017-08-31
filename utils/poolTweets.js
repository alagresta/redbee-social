var InterestModel = require('../models/interestModel');
var TwUtil = require('../utils/twitterUtils');
var TwitterModel = require('../models/twitterModel');
var userModel = require('../models/UserModel');
var Async = require('async');

var poolTweets = {};
var CLASS = 'poolTweets :'
poolTweets.updateTweets= function(callback){
var users =[];
//
// userModel.getUsers(function(error, data) {
//   if (typeof data !== 'undefined' && data.length > 0)  {
//     for(var ind = 1; ind < data.length; ind++){
//       users.push(data[ind].id);
//
//     }
//
//   }
//     console.log(CLASS+users);
// });



InterestModel.getUserSub(1, function(error, data) {

  if (typeof data !== 'undefined' && data.length > 0) {
    tags = JSON.parse(JSON.stringify(data));

    console.log(CLASS+'update Tweets for user id:'+ 1);
    for (i = 0; i < tags.length; i++) {
      var aTag =tags[i].tag;
      TwUtil.tweetsByTag(aTag, '', function(error, data) {
        if (data) {

          var tweets = [];
          for (var j = 0; j < data.length; j++) {

            var newTweet = {
              id : data[j].id_str,
              userid : 1,
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
                  console.log(CLASS+"Thread Tweet updated")
                  callback(null, aTweet);
                }
              });
            })
          });
          Async.parallel(calls, function(err, result) {
            if (err) return console.log(CLASS+err);
          });

        } else {
          console.log(CLASS+'no tweets by tag');
        }
      });
    }
  } else {  console.log(CLASS+"no user subscriptions");  }
});

}
module.exports = poolTweets;
