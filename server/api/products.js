const router = require('express').Router();
const Products = require('../models/products');
const Reviews = require('../models/reviews');
const Users = require('../models/users')


router.get('/:productId', function (req, res, next){

  Products.findById(req.params.productId, {include: [{model: Reviews, include: [Users]}]})
  .then(productFound => {
    res.send(productFound)
  })
  .catch(next)
});

// matches GET requests to /api/products/
router.get('/', function (req, res, next){
  Products.findAll({order: [['title', 'ASC']]})
  .then(productsFound => {
    res.send(productsFound)
  }).catch(next)
});



// matches POST requests to /api/products/
router.post('/', function (req, res, next){
  console.log('req.body: ', req.body)
  Products.create(req.body)
  .then(productCreated => res.send(productCreated))
  .catch(next)
});
// matches PUT requests to /api/products/:productId
router.put('/:productId', function (req, res, next){
  Products.update(req.body, {where: 
    {id: req.params.productId}
  }).then(productUpdated => res.send(productUpdated))
  .catch(next)
});
// matches DELTE requests to /api/products/:productId
router.delete('/:productId', function (req, res, next){
  Products.destroy({where: {
    id: req.params.productId}
  })
  .then(() => {
    res.sendStatus(204)
  })
});

module.exports = router;
