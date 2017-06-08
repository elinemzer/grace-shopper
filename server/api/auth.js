'use strict';

var router = require('express').Router();


var User = require('../models/Users');

router.get('/me', (req, res, next) => {
	User.findOne({
		where: {id: req.session.userId}
	})
	.then((foundUser) => {
		if(!foundUser){
			res.send({})
		}
		else res.send(foundUser);
	}).catch(next);
});


module.exports = router