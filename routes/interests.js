var express = require('express');
var insterest = require('../models/interestModel');
var poolTweets = require('../utils/poolTweets');
var twitterModel = require('../models/twitterModel');
var router = express.Router();


//mostramos todos los usuarios
router.get('/interest', function(req,res){
	insterest.getUsers(function(error, data)
	{
		res.json(200,data);
	});
});


/**
* @description  get subscriptions by user id
* @param user id
*/
router.get("/interest/:userId", function(req,res)
{

	var id = req.params.userId;
	// if numeric value
	if(!isNaN(id))
	{
		insterest.getUserSub(id,function(error, data)
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

/**
* @description  get tweets by subscriptions and user id
* @param user id
*/
router.get("/interest/tweets/:userId", function(req,res)
{
	var id = req.params.userId;
	if(!isNaN(id))
	{
		insterest.getUserSub(id,function(error, data)
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


/**
* @description  add subscriptions and user id
* @param user id
* @param tag
*/
router.put("/interest/:userId/:tag", function(req,res)
{
	//id del usuario
	var id = req.params.userId;
	var tag = req.params.tag;
	var nw = 'tw';
console.log("ADDING"+ tag);
	if(!isNaN(id))
	{
		insterest.insertSub(id,nw,tag,function(error, data)
		{
			if (typeof data !== 'undefined' && data.length > 0)
			{
				//poolTweets.updateTweets();
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



/**
* @description  delete subscriptions and user id
* @param user id
* @param tag
*/
router.post("/interest", function(req,res)
{
	//id del usuario
	var user_id = req.body.userID;
	var tag = req.body.tag;
	var nw = 'tw';
		insterest.deleteSub(user_id,tag,nw,function(error, data)
		{
			console.log(data);
			if (typeof data !== 'undefined' && data.length > 0)
			{
				twitterModel.deleteTweetsByUserTag(user_id,tag,function(error, data)
				{
					console.log(data);
					if (typeof data !== 'undefined' && data.length > 0)
					{
						res.json(200,data);
					}
					else
					{
						res.json(404, "error deleting tag tweets");
					}
				});
				res.json(200,data);
			}
			else
			{
				res.json(404, "object does not exist");
			}
		});

});





module.exports = router;
