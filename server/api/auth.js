const Products = require ('../models').Products
const Cart = require ('../models').Cart
var router = require('express').Router();


var User = require('../models/users');

router.get('/me', (req, res, next) => {
	let userId = req.user ? Number(req.user.id) : req.session.userId

	User.findOne({ 
		where: {id: userId}, 
		include: [{model: Products}]} )
	.then((foundUser) => {
	//if no user is found, simply send back the cart for permeation reasons
		if(!foundUser){
			console.log('oops', req.user)
			if(req.session.cart)
			res.send(req.session.cart)
			else{res.send([])}
		}
	//othe
		else {
			console.log('found user', foundUser)
			res.send(foundUser)}
	}).catch(next);
});



module.exports = router
