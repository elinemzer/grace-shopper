const router = require('express').Router();
const Orders = require('../models/orders');
const Users = require('../models/users');
const Products = require('../models/products');
const Product_Order = require('../models/product_order');
const Cart = require('../models/cart')
const Promise = require('bluebird')

//taking supplied order id and attaching product object to request
router.param('order', function(req, res, next, id){
  Orders.findById(id, { include: [Users] })
  .then(order => {req.order = order})
})

// matches GET requests to /api/orders/
router.get('/', function (req, res, next){
  const where = req.session.admin ? {} : {where: {UserId: req.session.userId}}
  Orders.findAll(where)
  .then(ordersFound => {
    let order = ordersFound[0];
    // console.log('orders found on api route: ', ordersFound)
    // console.log(order.getUser());
    res.send(ordersFound)
  })
  .catch(next)
});

router.get('/:orderId', function (req, res, next){
  Orders.findById(req.params.orderId)
  .then(orderFound => {
    if(orderFound.UserId === req.session.userId)
      res.send(orderFound)
    else {res.status(401).send('Access Denied - Please log in as admin to view this order')}
  })
  .catch(next)
});

router.get('/users/:userId', function (req, res, next){
  if(req.session.admin || req.session.userId === req.params.userId){
    Orders.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(ordersFound => {
    res.send(ordersFound)
  })
  .catch(next)
  } else {res.status(401).send('Access Denied - Please log in as admin to view this order')}

});
// matches POST requests to /api/orders/

  router.post('/', function (req, res, next){
    if(req.session.admin){
    Orders.create(req.body)
    .then(orderCreated => res.send(orderCreated))
    .catch(next)
    } else {res.status(401).send('Access Denied - Please log in as admin to view this order')}

});
// matches PUT requests to /api/orders/:orderId
router.put('/:orderId', function (req, res, next){


  if(req.session.admin){
    req.order.update(req.body)
      .then(orderUpdated => res.send(orderUpdated))
      .catch(next)
  } else {res.status(401).send('Access Denied - Please log in as admin to view this order')}

});

//"checkout" the received cart

router.post('/checkout', function (req, res, next){

  const getProducts = Promise.map(req.body, function (item){
    return Products.findById(item.id)
  })


  Orders.create({UserId: req.session.userId||'01', status: 'Created', datePlaced: Date()})
  .then( createdOrder => {
    //Use promise array to  get all products
    Promise.all(getProducts)
    .then(allProducts =>{
      //Create new promise array that adds all products to order
      return Promise.map(allProducts, (product) =>{
        return createdOrder.addProducts(product)
      })
      //execute promise array to add all products to order
      .then(addingProducts =>{
        return Promise.all(addingProducts)
      })
      .then( addedProducts =>{
        //Create promise array to update product orders
        return Promise.map(req.body, (product) =>{
          return Product_Order.update({quantity: product.Cart.quantity, price: product.price}, {where: {OrderId: createdOrder.id, ProductId: product.id}})
      })
      .then( allProductOrders => {
        //Update all product orders
        return Promise.all(allProductOrders)
      })
      .then( () =>{
        //Destroy User/Products cart associations
        return Cart.destroy({where: {UserId: req.session.userId}})
      })
      .then(foundCarts => {
        //Retrieve the created order with the newly added products
        return Orders.findById(createdOrder.id, {include: [{model: Products}]})
      })
      .then(foundOrderWithProds => {
            //Send back the order with the products for adding onto the state
            res.status(201).send(foundOrderWithProds)
      })
      .catch(next)
      })
    })


  })
});
// matches DELETE requests to /api/orders/:orderId
router.delete('/:orderId', function (req, res, next){
  if(req.session.admin){
    req.order.destroy(req.body)
    .then(() => {
      res.sendStatus(204)
    })
  } else {res.status(401).send('Access Denied - Please log in as admin to view this order')}

});

module.exports = router;
