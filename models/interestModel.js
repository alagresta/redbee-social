//llamamos al paquete mysql
var mysql = require('mysql');
var config = require('../config.sample');
//creamos la conexion
connection = mysql.createConnection(config.connectionData);

//creo un objeto para ir almacenando todo
var interestModel = {};

//obtenemos un usuario por su id
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

//Add new interest
/*
 * userData {network, tag, userid}
 */
interestModel.insertSub = function(id,tag,nw,callback)
{
	if (connection)
	{

		var query = 'INSERT INTO subscription SET VALUES '+
			id+",'"+tag+"','"+nw+"'";

		;
		connection.query(query, function(error, result)
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


//eliminar un usuario pasando la id a eliminar
interestModel.deleteSub = function(tag,userId,nw, callback)
{
	if(connection)
	{
		var sqlExists = 'SELECT * FROM subscriptions WHERE userid = ' + connection.escape(userId) +
		' AND tag='+ connection.escape(tag) +
		" AND network= '"+nw+"'";
		;
		connection.query(sqlExists, function(err, row)
		{
			//si existe el tag en el usuario
			if(row)
			{
				var sql = 'DELETE FROM subscriptions WHERE userid = ' + connection.escape(userId) +
				' AND tag='+ connection.escape(tag) +
				' AND network= ' + connection.escape(nw);
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
module.exports = interestModel;
