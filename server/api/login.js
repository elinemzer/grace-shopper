const router = require('express').Router();
const Users = require('../models/users');
const Products = require('../models/products');
const Cart = require('../models/cart');
const Promise = require('bluebird')

router.post('/login', (req, res, next) => {
  //Turn cart into promises to get sequelize database objects for each product
  const getProducts = Promise.map(req.session.cart||[], function (item){
    return Products.findById(item.id)
  })

  Users.findOne({
    where: {email: req.body.email},
    include: [{model: Products}]
  })
  .then(user => {
    if (!user) {res.status(401).send('User not found')}

    else if (!user.correctPassword(req.body.password)) {
      res.status(401).send('Incorrect password');
    }

    else {
      //Get all products, then map an array of promises to add each product for the returned user
      Promise.all(getProducts)
      .then(allProducts =>{
        return Promise.map(allProducts, (product) => {
          return user.addProducts(product)
          }).then(addingProducts => {
          Promise.all(addingProducts)
        })
      })

      //update session info and remove cart
      delete req.session.cart
      req.session.userId = user.id
      req.session.admin =user.isAdmin

      //add all former session cart items to the user products

        req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });


      }
    })

    .catch(next);
});

router.post('/logout', (req, res, next) => {
    
    delete req.session.userId
    delete req.session.cart
    delete req.session.admin
    res.status(201).send()


});



router.post('/signup', (req, res, next) => {
  Users.create(req.body)
  .then(createdUser =>{
    return Users.findOne({
      where: {id: createdUser.id},
      include: {model: Products}
    })
  })
    .then(user => {
      req.login(user, err => {
        req.session.userId = user.id
        if (err) next(err);
        else res.json(user);
      });
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.sendStatus(200);
});

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
