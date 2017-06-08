const router = require('express').Router();
const Carts = require('../models/Carts');
const Users = require('../models/Users');

//taking supplied cart id and attaching product object to request
router.param('cart', function(req, res, next, id){
  Carts.findById(id, { include: [Users] })
  .then(cart => {req.cart = cart})
})

// matches GET requests to /api/cart/
router.get('/', function (req, res, next){
  Carts.findAll()
  .then(cartsFound => res.send(cartsFound))
  .catch(next)
});

router.get('/:cartId', function (req, res, next){
  Carts.findById(req.params.cartId)
  .then(cartFound => {
    res.send(cartFound)
  })
  .catch(next)
});
// matches POST requests to /api/carts/
router.post('/', function (req, res, next){
  Carts.create(req.body)
  .then(cartCreated => res.send(cartCreated))
  .catch(next)
});
// matches PUT requests to /api/carts/:cartId
router.put('/:cartId', function (req, res, next){
  req.cart.update(req.body)
  .then(cartUpdated => res.send(cartUpdated))
  .catch(next)
});
// matches DELTE requests to /api/carts/:cartId
router.delete('/:cartId', function (req, res, next){
  req.cart.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});
