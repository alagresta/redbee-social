var express = require('express');
var UserModel = require('../models/userModel');
var TwitterModel = require('../models/twitterModel');
var InterestModel = require('../models/interestModel');
var router = express.Router();


//mostramos todos los usuarios
router.get('/users', function(req,res){
	UserModel.getUsers(function(error, data)
	{
		res.json(200,data);
	});
});

//obtiene un usuario por id
router.get("/users/:id", function(req,res) {

	var id = req.params.id;
	//solo sid es un número
	if(!isNaN(id))
	{
		UserModel.getUserById(id,function(error, data)
		{
			if (typeof data !== 'undefined' && data.length > 0) {
				res.json(200,data);
			}	else {
				res.json(404,{"msg":"notExist"});
			}
		});
	}

	else
	{
		res.json(500,{"msg":"Error"});
	}
});


//obtiene un usuario por id
router.get("/username/:username", function(req,res) {

	var username = req.params.username;
	//solo sid es un número
		UserModel.getUserByUName(username,function(error, data)
		{
			if (typeof data !== 'undefined' && data.length > 0) {
				res.json(200,data[0]);
			}	else {
				res.json(404,{"msg":"notExist"});
			}
		});

});



//función que usa el verbo http put para actualizar usuarios
router.put("/users", function(req,res) {
	//almacenamos los datos del formulario en un objeto
	var userData = {
		id : req.param('id'),
		username : req.param('username'),
		name:req.param('name') ,
		lastname:req.param('lastname'),
		email : req.param('email')
	};
	UserModel.updateUser(userData,function(error, data)
	{
		//si el usuario se ha actualizado correctamente mostramos un mensaje
		if(data && data.msg){
			res.json(200,data);
		}else{
			res.json(500,{"msg":"Error"});
		}
	});
});


//obtiene un usuario por su id
router.post("/users", function(req,res)
{
	//creamos un objeto con los datos a insertar del usuario
	var userData = {

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





router.get("/usersTweets/:id/:page", function(req,res)
{

	var id = req.params.id;
	var page = req.params.page;

	if(!isNaN(id))
	{
		TwitterModel.geTweetsByUser(id,page,function(error, data)
		{

			if (typeof data !== 'undefined' && data.length > 0)
			{
				res.json(200,data);
			}

			else
			{



				res.json(404,{"msg":"notExist"});


			}
		});
	}

	else
	{
		res.json(500,{"msg":"Error"});
	}
});


module.exports = router;
