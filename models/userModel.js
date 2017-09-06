/**
 * @author A.Lagresta
 * @name User Data Model
 * created on 21.8.2017
 * @description database model for User entity
*/
var mysql = require('mysql');
var config = require('../config.sample');
connection = mysql.createConnection(config.connectionData);


var userModel = {};

// All users
userModel.getUsers = function(callback)
{
	if (connection)
	{
		connection.query('SELECT * FROM users ORDER BY id', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null, rows);
			}
		});
	}
}

// User by id
userModel.getUserById = function(id,callback)
{
	if (connection)
	{
		var sql = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
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


// User by username
userModel.getUserByUName = function(username,callback)
{
	if (connection)
	{
		var sql = 'SELECT * FROM users WHERE username = ' + connection.escape(username);
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



// insert User
userModel.insertUser = function(userData,callback)
{
	if (connection)
	{
		connection.query('INSERT INTO users SET ?', userData, function(error, result)
		{
			if(error)
			{
				throw error;
			}
			else
			{
				//devolvemos la última id insertada
				callback(null,{"insertId" : result.insertId});
			}
		});
	}
}

// Update user
userModel.updateUser = function(userData, callback)
{
	//console.log(userData); //return;
	if(connection)
	{
		var sql = 'UPDATE users SET '+
		'username = ' + connection.escape(userData.username) + ',' +
		'name = ' + connection.escape(userData.name) + ',' +
		'lastname = ' + connection.escape(userData.lastname) + ',' +
		'email = ' + connection.escape(userData.email) +
		'WHERE id = ' + userData.id;

		console.log(sql);
		connection.query(sql, function(error, result)
		{
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,{"msg":"success"});
			}
		});
	}
}

// Delete user
userModel.deleteUser = function(id, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
		connection.query(sqlExists, function(err, row)
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM users WHERE id = ' + connection.escape(id);
				connection.query(sql, function(error, result)
				{
					if(error)
					{
						throw error;
					}
					else
					{
						callback(null,{"msg":"deleted"});
					}
				});
			}
			else
			{
				callback(null,{"msg":"notExist"});
			}
		});
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = userModel;
