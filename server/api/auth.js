const Products = require ('../models').Products
const Cart = require ('../models').Cart
var router = require('express').Router();


var User = require('../models/users');

router.get('/me', (req, res, next) => {
	User.findOne({
		where: {id: req.session.userId},
		include: [{model:Products}]
	})
	.then((foundUser) => {
		if(!foundUser){
			res.send({})
		}
		else res.send(foundUser);
	}).catch(next);
});


module.exports = router