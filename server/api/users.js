const router = require('express').Router();
const Users = require('../models/users');
const Cart = require('../models/cart');
const Products = require('../models/products');
const Orders = require('../models/orders')
const _ = require('lodash')


//Get user by userId (for individual user page/admin user view)
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
  if(req.session.admin){
    Users.create(req.body)
      .then(userCreated => res.send(userCreated))
      .catch(next)
  } else (res.status(401).send('Access Denied - Please log in as admin to complete this action'))

});

// matches PUT requests to /api/users/:userId
router.put('/:userId', function (req, res, next){
  if(req.session.admin || req.params.userId === req.session.userId){
  Users.update({passwordReset: true}, {where:{id:req.params.userId}})
  .then(userUpdated => {
    res.send(userUpdated)
  })
  .catch(next)
  } else (res.status(401).send('Access Denied - Please log in as admin to complete this action')) 

});

// matches DELETE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next){
  if(req.session.admin) {
      Users.destroy({where: {
        id: req.params.userId
      }
    }).then(() => {
      res.sendStatus(204)
    })
  }
  else (res.status(401).send('Access Denied - Please log in as admin to complete this action')) 


});

// Adds Product Cart model if a user is logged in, otherwise permeate on the session store
router.post('/item', function (req, res, next){
  if(req.session.userId){
    //If a user is logged in, pull that user and add the product via the join table

    Users.findById(req.session.userId)
    .then( user => {
      return user.addProducts(req.body.id)

    })
    //then pull back the cart entry by user id and product id
    .then((user) => {
      return Cart.findOne({
        where: {
          UserId: req.session.userId,
          ProductId: req.body.id
        }
      })
    })
    //add or increment quantity (quantity not added automatically)
    .then( cart =>{
      console.log(cart)
      if(!cart.quantity)
      return cart.update({quantity: 1})
      else return cart.update({quantity: cart.quantity++})
    })
    //pull back the user and eager load products, now with updated quantity
    .then(cart=>{
      return Users.findById(cart.UserId, {include: [{model: Products}]})
    })
    .then(user =>{
      res.status(200).send(user)
    })
    .catch(next)
  } 
  //If a user is not logged in, add the item to the session cart
  else {
    //if the session cart already exists, add this item to it,
    if (req.session.cart){
      req.session.cart = req.session.cart.concat([Object.assign({Cart:{quantity:1}}, req.body)])
    }
    // otherwise create it starting with this item. 
    else {
      req.session.cart = [Object.assign({Cart:{quantity:1}}, req.body)]
    }
    res.status(201).send(req.session.cart)
  }

});

//Delete or decrement item. Will delete if only one item is in cart, otherwise will reduce quantity by one
router.delete('/item/:itemId', function (req, res, next){
  if (req.session.userId){
    //if a user is logged in, find the join tabe entry for the logged in user and the product being decremented/deleted
     Cart.findOne({where: {
      UserId: req.session.userId,
      ProductId: req.params.itemId
    }})
    //Check quantity. If it is greater than one, reduce it by one and send back the cart row. Otherwise destroy the cart row
    .then( cartRow => {
      if(cartRow.quantity > 1)
        return cartRow.update({quantity: cartRow.quantity - 1})
      
      else return cartRow.destroy()
    })
    //Using returned value, find the user and their new Products
    .then((result) => {
      return Users.findById(req.session.userId, {include:[{model: Products}]})
    })
    //Send back products for the state
    .then(foundUser =>{
      res.status(201).send(foundUser.Products)
    })
    .catch(next)
  } 
  //If a user is not logged in, pull the req session cart
  else {
    req.session.cart = req.session.cart.map( item =>{
      //decrement objects that share an ID with the item passed in the params. There should only be one such object per array
      if(Number(item.id) === Number(req.params.itemId)) Object.assign(item, item.Cart.quantity -= 1)
        return item
    })
    //Remove items that have a quantity of 0
    req.session.cart = req.session.cart.filter( item =>{
      return item.Cart.quantity > 0
    })
    res.status(201).send(req.session.cart)
  }
});

//use Put request type to increment quantity
router.put('/item/:itemId', function (req, res, next){
  if (req.session.userId){
    //if a user is logged in, pull the join table record for that user and the product being incremented

    Cart.findOne({where: {
      UserId: req.session.userId,
      ProductId: req.params.itemId
    }})
    //increment the quantity
    .then( cartRow => {
      return cartRow.update({quantity: cartRow.quantity + 1})
    })
    //pull the user, and send back the products for the cart
    .then((result) => {
      return Users.findById(req.session.userId, {include:[{model: Products}]})
    })
    .then(foundUser =>{
      res.status(201).send(foundUser.Products)
    })
    .catch(next)
  } 
  //If user is not logged in, increment the quantity on the session cart
  else {

    req.session.cart = req.session.cart.map( item =>{
      if(Number(item.id) === Number(req.params.itemId)) Object.assign(item, item.Cart.quantity += 1)
        return item
    })
    res.status(201).send(req.session.cart)
  }

});

// matches GET requests to /api/users/
router.get('/', function (req, res, next){
  const where = req.session.admin ? {} : {where:{id: req.session.userId}}
  Users.findAll(where)
  .then(usersFound => res.send(usersFound))
  .catch(next)
});

module.exports = router;
