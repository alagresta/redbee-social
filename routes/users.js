/**
* @author A.Lagresta
* @name User api route
* created on 17.8.2017
* @description Router with user api public methods.
*/
var express = require('express');
var UserModel = require('../models/userModel');
var TwitterModel = require('../models/twitterModel');
var InterestModel = require('../models/interestModel');
var poolTweets = require('../utils/poolTweets');
var router = express.Router();


/**
* @description  get all users
*/
router.get('/users', function(req,res){
	UserModel.getUsers(function(error, data)
	{
		res.json(200,data);
	});
});


/**
* @description  get user by id
* @param user id
*/
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


/**
* @description  get user by username
* @param username
*/
router.get("/username/:username", function(req,res) {
	var username = req.params.username;
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
	var userData = {
		id : req.param('id'),
		username : req.param('username'),
		name:req.param('name') ,
		lastname:req.param('lastname'),
		email : req.param('email')
	};
	UserModel.updateUser(userData,function(error, data)
	{
		if(data && data.msg){
			res.json(200,data);
		}else{
			res.json(500,{"msg":"Error"});
		}
	});
});



router.post("/users", function(req,res)
{
	var userData = {
		username : req.body.username,
		name:req.body.name ,
		lastname:req.body.lastname,
		email : req.body.email
	};
	console.log(userData);
	UserModel.insertUser(userData,function(error, data)
	{
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




/**
* @description  get user's tweets
* @param user is
* @param pagenumber
*/
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
				res.json(503,{"msg":"no tweets"});

			}
		});
	}
	else
	{
		res.json(500,{"msg":"Error"});
	}
});


module.exports = router;
