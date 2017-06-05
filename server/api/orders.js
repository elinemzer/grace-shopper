const router = require('express').Router();
const Orders = require('../models/orders');
const Users = require('../models/users');

//taking supplied order id and attaching product object to request
router.param('order', function(req, res, next, id){
  Orders.findById(id, { include: [Users] })
  .then(order => {req.order = order})
})

// matches GET requests to /api/orders/
router.get('/', function (req, res, next){
  Orders.findAll()
  .then(ordersFound => res.send(ordersFound))
  .catch(next)
});

router.get('/:orderId', function (req, res, next){
  res.send(req.order)
  .catch(next)
});
// matches POST requests to /api/orders/
router.post('/', function (req, res, next){
  Orders.create(req.body)
  .then(orderCreated => res.send(orderCreated))
  .catch(next)
});
// matches PUT requests to /api/orders/:orderId
router.put('/:orderId', function (req, res, next){
  req.order.update(req.body)
  .then(orderUpdated => res.send(orderUpdated))
  .catch(next)
});
// matches DELTE requests to /api/orders/:orderId
router.delete('/:orderId', function (req, res, next){
  req.order.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});
