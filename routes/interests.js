var express = require('express');
var insterest = require('../models/interestModel');
var router = express.Router();


//mostramos todos los usuarios
	router.get('/interest', function(req,res){
		insterest.getUsers(function(error, data)
		{
			res.json(200,data);
		});
	});

//obtiene un usuario por id
	router.get("/interest/:userId", function(req,res)
			{
				//id del usuario
				var id = req.params.userId;
				//solo actualizamos si la id es un número
				if(!isNaN(id))
				{
					insterest.getUserSub(id,function(error, data)
					{
						//si el usuario existe lo mostramos en formato json
						if (typeof data !== 'undefined' && data.length > 0)
						{
							res.json(200,data);


						}
						//en otro caso mostramos una respuesta conforme no existe
						else
						{
							res.json(404,{"msg":"notExist"});
						}
					});
				}
				//si hay algún error
				else
				{
					res.json(500,{"msg":"Error"});
				}
			});

	//obtiene un usuario por id
		router.get("/interest/tweets/:userId", function(req,res)
				{
					//id del usuario
					var id = req.params.userId;
					//solo actualizamos si la id es un número
					if(!isNaN(id))
					{
						insterest.getUserSub(id,function(error, data)
						{
							//si el usuario existe lo mostramos en formato json
							if (typeof data !== 'undefined' && data.length > 0)
							{
								res.json(200,data);


							}
							//en otro caso mostramos una respuesta conforme no existe
							else
							{
								res.json(404,{"msg":"notExist"});
							}
						});
					}
					//si hay algún error
					else
					{
						res.json(500,{"msg":"Error"});
					}
				});


		//obtiene un usuario por su id
			router.post("/postByinterest", function(req,res)
			{
				//creamos un objeto con los datos a insertar del usuario
				var userData = {
				/*	id : null,
					username : req.body.username,
					email : req.body.email,
					password : req.body.password,
					created_at : null,
					updated_at : null*/

//					id : null,
					username : req.body.username,
					name:req.body.name ,
					lastname:req.body.lastname,
					email : req.body.email


				};
				console.log(userData);
				UserModel.insertUser(userData,function(error, data)
				{
					//si el usuario se ha insertado correctamente mostramos su info
					if(data && data.insertId)
					{
						res.redirect("/users/" + data.insertId);
					}
					else
					{
						res.json(500,{"msg":"Error"});
					}
				});
			});

			router.put("/interest/:userId/:tag", function(req,res)
					{
						//id del usuario
						var id = req.params.userId;
						var tag = req.params.tag;
						var nw = 'tw';
						//solo actualizamos si la id es un número
						if(!isNaN(id))
						{
							insterest.insertSub(id,tag,nw,function(error, data)
							{
								//si el usuario existe lo mostramos en formato json
								if (typeof data !== 'undefined' && data.length > 0)
								{
									res.json(200,data);


								}
								//en otro caso mostramos una respuesta conforme no existe
								else
								{
									res.json(404,{"msg":"notExist"});
								}
							});
						}
						//si hay algún error
						else
						{
							res.json(500,{"msg":"Error"});
						}
					});


module.exports = router;
