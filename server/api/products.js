const router = require('express').Router();
const Products = require('../models/products');

//taking supplied product id and attaching product object to request

// router.param('product', function(req, res, next, id){
//   Products.findById(id)
//   .then(product => {req.product = product})
// })

//needed a db query
router.get('/:productId', function (req, res, next){

  Products.findById(req.params.productId)
  .then(productFound => {
    console.log('in route with', productFound)
    res.send(productFound)
  })
  .catch(next)
});

// matches GET requests to /api/products/
router.get('/', function (req, res, next){
  Products.findAll()
  .then(productsFound => {

    res.send(productsFound)})
  .catch(next)
});



// matches POST requests to /api/products/
router.post('/', function (req, res, next){
  Products.create(req.body)
  .then(productCreated => res.send(productCreated))
  .catch(next)
});
// matches PUT requests to /api/products/:productId
router.put('/:productId', function (req, res, next){
  req.product.update(req.body)
  .then(productUpdated => res.send(productUpdated))
  .catch(next)
});
// matches DELTE requests to /api/products/:productId
router.delete('/:productId', function (req, res, next){
  req.product.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});

module.exports = router;
