/**
* @author A.Lagresta
* @name Twitter Data Model
* created on 21.8.2017
* @description database model for Twitter entity
*/
var mysql = require('mysql');
var config = require('../config.sample');
//creamos la csonexion
connection = mysql.createConnection(config.connectionData);
var ITEMS_PER_PAGE = 10;
var twitterModel = {};
twitterModel.geTopTweetsByUser = function(id_user, max, callback) {
	if (connection) {
		var maxMin = '';
		if (max) {
		maxMin='MAX';
		} else {
		maxMin='MIN';

		}
		var sql = 'SELECT '+ maxMin + '(tweet_id) as ID FROM redbee.tweets_view WHERE user_id =' + id_user;
		connection.query(sql, function(error, row) {
			if (error) {
				throw error;
			} else {
				//console.log(row);
				callback(null, row);
			}
		});
	}
}



//Tweets by user
twitterModel.geTweetsByUser = function(id, page, callback) {
	if (connection) {
		var offset = (page - 1) * ITEMS_PER_PAGE;
		var sql = 'SELECT * FROM redbee.tweets_view WHERE user_id =' + id +
		' LIMIT ' + offset + ',' + ITEMS_PER_PAGE;
		connection.query(sql, function(error, row) {
			if (error) {
				throw error;
			} else {
				//console.log(row);
				callback(null, row);
			}
		});
	}
}

//añadir un nuevo usuario
twitterModel.insertTweet = function(tweetdata, callback) {
	if (connection) {
		var queryInsert = 'INSERT INTO redbee.tweet_posts' +
		"  VALUES " +
		"(" + tweetdata.string_id + ',' +
		tweetdata.userid + ',' +
		"'" + tweetdata.tag + "'" + ',' +
		"STR_TO_DATE('" + tweetdata.created_at + "', '%a %b %d %H:%i:%s +0000 %Y'),'" +
		(tweetdata.oEmbed).replace('\n', '') + "'," + tweetdata.id + ")";

		var sqlExists = 'SELECT * FROM redbee.tweet_posts WHERE 	id_str = ' + tweetdata.string_id;

		connection.query(sqlExists, function(err, row) {
			//si existe la id del usuario a eliminar
			if (row.length > 0) {
				console.log('repeted ' + tweetdata.tweetid);
				callback(null, {
					"msg": "reapeted id"
				});
			} else {
				connection.query(queryInsert, function(error, result) {
					if (error) {
						console.log(error);
						callback(null, {
							"msg": "reapeted id"
						});
					} else {
						console.log('inserted ' + tweetdata.id + 'str_id: ' + tweetdata.string_id);
						//devolvemos la última id insertada
						callback(null, {
							"insertId": result.insertId
						});
					}
				});
			}
		});
	}
}
//eliminar un usuario pasando la id a eliminar
twitterModel.deleteTweetsByUserTag = function(uid, tag, callback) {
	if (connection) {
		var sql = 'DELETE FROM tweet_posts WHERE user_id = ' + uid + " AND tag ='" + tag + "'";
		connection.query(sql, function(error, result) {
			if (error) {
				throw error;
			} else {
				callback(null, {
					"msg": "deleted tweets for user" + uid + +" and tag : " + tag
				});
			}
		});
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = twitterModel;
