//obtenemos el modelo UserModel con toda la funcionalidad
var UserModel = require('../models/userModel');
var express = require('express');
var router = express.Router();



	//formulario que muestra los datos de un usuario para editar
	router.get("/user/update/:id", function(req, res){
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			UserModel.getUser(id,function(error, data)
			{
				//si existe el usuario mostramos el formulario
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.render("index",{ 
						title : "Formulario", 
						info : data
					});
				}
				//en otro caso mostramos un error
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});
		}
		//si la id no es numerica mostramos un error de servidor
		else
		{
			res.json(500,{"msg":"The id must be numeric"});
		}
	});

	//formulario para crear un nuevo usuario
	router.get("/create", function(req, res){
		res.render("new",{ 
			title : "Formulario para crear un nuevo recurso"
		});
	});

	//formulario para eliminar un usuario
	router.get("/delete", function(req, res){
		res.render("delete",{ 
			title : "Formulario para eliminar un recurso"
		});
	});

	//mostramos todos los usuarios 
	router.get("/users", function(req,res){
		UserModel.getUsers(function(error, data)
		{
			res.json(200,data);
		});
	});

	//obtiene un usuario por su id
	router.get("/users/:id", function(req,res)
	{
		//id del usuario
		var id = req.params.id;
		//solo actualizamos si la id es un número
		if(!isNaN(id))
		{
			UserModel.getUser(id,function(error, data)
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
	router.post("/users", function(req,res)
	{
		//creamos un objeto con los datos a insertar del usuario
		var userData = {
			id : null,
			username : req.body.username,
			email : req.body.email,
			password : req.body.password,
			created_at : null,
			updated_at : null
		};
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

	//función que usa el verbo http put para actualizar usuarios
	router.put("/users", function(req,res)
	{
		//almacenamos los datos del formulario en un objeto
		var userData = {id:req.param('id'),username:req.param('username'),email:req.param('email')};
		UserModel.updateUser(userData,function(error, data)
		{
			//si el usuario se ha actualizado correctamente mostramos un mensaje
			if(data && data.msg)
			{
				res.json(200,data);
			}
			else
			{
				res.json(500,{"msg":"Error"});
			}
		});
	});

	


module.exports = router;