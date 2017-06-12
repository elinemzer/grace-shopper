const Products = require ('../models').Products
const Cart = require ('../models').Cart
var router = require('express').Router();


var User = require('../models/users');

router.get('/me', (req, res, next) => {
	User.findOne({
		where: {id: req.session.userId},
		include: [
			{model: Products}
		]
	})
	.then((foundUser) => {
	//if no user is found, simply send back the cart for permeation reasons
		if(!foundUser){
			if(req.session.cart)
			res.send(req.session.cart)
			else{res.send([])}
		}
	//othe
		else res.send(foundUser);
	}).catch(next);
});



module.exports = router