//llamamos al paquete mysql 
var mysql = require('mysql');
var config = require('../config.sample');
//creamos la csonexion 
connection = mysql.createConnection(config.connectionData);
var ITEMS_PER_PAGE = 10;

//creo un objeto para ir almacenando todo
var twitterModel = {};



//obtenemos un usuario por su id
twitterModel.geTweetsByUser = function(id,page,callback)
{
	if (connection) 
	{
		var offset = (page-1) * ITEMS_PER_PAGE;
		
	
		var sql = 'SELECT * FROM tweets_view WHERE userid = ' + connection.escape(id) 
		+ 'GROUP BY id, userid order by id DESC'+
		' LIMIT '+offset+','+ITEMS_PER_PAGE
		;
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

//añadir un nuevo usuario
twitterModel.insertTweet = function(tweetdata,callback)
{
	if (connection) 
	{
		var queryInsert = 'INSERT INTO tweets'
		+"  VALUES "
		+ "("+tweetdata.id+','
		+ tweetdata.userid+','
		+ "'"+tweetdata.tag+"'"+','
		+ "STR_TO_DATE('"+tweetdata.created_at+"', '%a %b %d %H:%i:%s +0000 %Y'),'"
		+ tweetdata.oEmbed+"')"
		;
	
		var sqlExists = 'SELECT * FROM tweets WHERE 	id = ' + tweetdata.id;
		
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row.length>0)
			{
				console.log('repeted '+tweetdata.tweetid);	
				callback(null,{"msg":"reapeted id"});
				
			}
			else
			{
				
				
				
				connection.query(queryInsert, function(error, result) 
						{
							if(error)
							{
								console.log( error);
								callback(null,{"msg":"reapeted id"});
							
							}
							else
							{
								console.log('inserted ' +  tweetdata.id);	
								//devolvemos la última id insertada
								callback(null,{"insertId" : result.insertId});
								
								
							}
						});
				
			
			}
		});
		
		
	
	}
}




//eliminar un usuario pasando la id a eliminar
twitterModel.deleteTweetsByUserTag = function(uid,tag, callback)
{
	if(connection)
	{
		
			//si existe la id del usuario a eliminar
			
				var sql = 'DELETE FROM tweets WHERE userid = ' + connection.escape(uid)+" AND tag ="+ tag +"'";
				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
					}
					else
					{
						callback(null,{"msg":"deleted tweets for user"+uid+ +" and tag : "+tag});
					}
				});
			}

}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = twitterModel;