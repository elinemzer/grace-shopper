const router = require('express').Router();
const Users = require('../models/users');
const Cart = require('../models/cart')
const Products = require('../models/products')
//taking supplied user id and attaching product object to request
// router.param('user', function(req, res, next, id){
//   Users.findById(id, { include: [Cart] })
//   .then(user => {req.user = user})
// })



router.get('/:userId', function (req, res, next){
  console.log("getting user by id")
  Users.findById(req.params.userId, {include: [Products]})
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
  req.user.update(req.body)
  .then(userUpdated => res.send(userUpdated))
  .catch(next)
});
// matches DELTE requests to /api/users/:userId
router.delete('/:userId', function (req, res, next){
  req.user.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});

// matches GET requests to /api/users/
router.get('/', function (req, res, next){
  Users.findAll()
  .then(usersFound => res.send(usersFound))
  .catch(next)
});

module.exports = router;
