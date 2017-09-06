/**
 * @author A.Lagresta
 * @name Interest Data Model
 * created on 20.8.2017
 * @description database model for Interest entity
*/
var mysql = require('mysql');
var config = require('../config.sample');
connection = mysql.createConnection(config.connectionData);

var interestModel = {};


/**
 * @description  get subscriptions by user id
 * @param user id
*/
interestModel.getUserSub = function(id,callback)
{
	if (connection)
	{
		var sql = 'SELECT * FROM subscriptions WHERE userid = ' + connection.escape(id);
		connection.query(sql, function(error, row)
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, row);
			}
		});
	}
}


/**
 * @description  get subscriptions by user id
 * @param user id
 * @param hashtag/user
 * @param network
*/
interestModel.insertSub = function(id,tag,nw,callback)
{
	if (connection)
	{
		var query = 'INSERT INTO subscription VALUES '+
			"("+id+",'"+tag+"','"+nw+"')";
		connection.query(query, function(error, result)
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{"insertId" : result.insertId});
			}
		});
	}
}

/**
 * @description  delete subscriptions
 * @param user id
 * @param hashtag/user
 * @param network
*/
interestModel.deleteSub = function(userID,tag,nw,callback)
{

				var sql = 'DELETE FROM subscriptions WHERE userid = '+ userID +
				" AND tag='"+ tag +"'"+
				" AND network= '"+nw+"'";


				connection.query(sql, function(error, result)
				{
					if(error)
					{
							throw error;
					}
					else
					{
						callback(null,[{"msg":"deleted"}]);
					}
				});


}

module.exports = interestModel;
