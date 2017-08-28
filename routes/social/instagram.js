var express = require('express');
var router = express.Router();
var Instagram = require('node-instagram').default;
var config = require('../../config.sample');



//Create a new instance.
var instagram = new Instagram(config.instagram);

/* GET home page. */
router.get('/', function(req, res) {
	//res.render('index', { title: 'Angular, Node and Twitter API' });
	//res.json({ message: 'wellcome to social feed api' }); 
	console.log(config.instagram);
	//Get user info
	instagram.get('users/self', function(err, data) {
		console.log(err, data);
	});


});


//obtiene un usuario por id
router.get('tags/:tag', function(req, res) {
	//id del usuario
	var id = req.params.tag;

	if (id) {


		instagram.get('tags/' + id, function(error, data) {
			//si el usuario existe lo mostramos en formato json
			if (typeof data !== 'undefined' && data.length > 0) {
				res.json(200, data);
			}
			//en otro caso mostramos una respuesta conforme no existe
			else {
				res.json(404, {
					"msg" : "notExist"
				});
			}
		});

	}
	//si hay algún error
	else {
		res.json(500, {
			"msg" : "Error"
		});
	}
});






module.exports = router;