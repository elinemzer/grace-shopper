const router = require('express').Router();
const Users = require('../models/users');
const Cart = require('../models/cart');
const Products = require('../models/products');
const Orders = require('../models/orders')
const _ = require('lodash')



router.get('/:userId', function (req, res, next){
  Users.findById(req.params.userId, {include: [{model: Orders, include: [Products]}]})
  .then(userFound => {
    console.log('userFound: ', userFound)
    res.send(userFound)
  })
  .catch(next)
});
// matches POST requests to /api/users/
router.post('/', function (req, res, next){
  Users.create(req.body)
  .then(userCreated => res.send(userCreated))
  .catch(next)
});
// matches PUT requests to /api/users/:userId
router.put('/:userId', function (req, res, next){
  Users.findById(req.params.userId)
  .then(userFound => {
    return userFound.update(req.body)
  })
  .then(userUpdated => {
    res.send(userUpdated)
  })
  .catch(next)
});
// matches DELTE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next){
  req.user.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});

// adds item to cart
router.post('/item', function (req, res, next){
  if(req.session.userId){
    //if a user is logged in, pull that user and add the product via the join table

    Users.findById(req.session.userId)
    .then( user => {
      user.addProducts(req.body.id)
      return user
    })
    .then((user) => {
      res.status(200).send(user)
    })  
    .catch(next)
  } else{
    //otherwise, add the item to the session cart
    //if the session cart already exists, add this item to it,
    // otherwise create it starting with this item.
    if(req.session.cart){
      req.session.cart = req.session.cart.concat([Object.assign({Cart:{quantity:1}}, req.body)])
    } else {
      req.session.cart = [Object.assign({Cart:{quantity:1}}, req.body)]
    }
    
    res.status(201).send(req.session.cart)
  }

});


router.delete('/item/:itemId', function (req, res, next){
  if(req.session.userId){
    //if a user is logged in, pull that user and add the product via the join table

    Cart.findOne({where: {
      UserId: req.session.userId,
      ProductId: req.params.itemId
    }})
    .then( cartRow => {
      return cartRow.destroy()
    })
    .then((result) => {
      return Users.findById(req.session.userId, {include:[{model: Products}]})
    })
    .then(foundUser =>{
      res.status(201).send(foundUser.Products)
    })
    .catch(next)
  } else{

    req.session.cart = req.session.cart.filter( item =>{
      return item.id != req.params.itemId
    })
    res.status(201).send(req.session.cart)
  }

});
// matches GET requests to /api/users/
router.get('/', function (req, res, next){
  Users.findAll({})
  .then(usersFound => res.send(usersFound))
  .catch(next)
});

module.exports = router;
