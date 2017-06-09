const router = require('express').Router();
const Reviews = require('../models/reviews');
const Users = require('../models/users');

router.get('/:reviewId', function (req, res, next){
  Reviews.findById(req.params.reviewId)
  .then(reviewFound => {
    res.send(reviewFound)
  })
  .catch(next)
});

// matches GET requests to /api/reviews/
router.get('/', function (req, res, next){
  Reviews.findAll()
  .then(reviewsFound => res.send(reviewsFound))
  .catch(next)
});



// matches POST requests to /api/reviews/
router.post('/', function (req, res, next){
  console.log("making request, body: ", req.body)
  Reviews.create(req.body)
  .then(reviewCreated => {
    console.log("review created: ", reviewCreated)
    return res.send(reviewCreated)
  }).catch(next)
});
// matches PUT requests to /api/reviews/:reviewId
router.put('/:reviewId', function (req, res, next){
  req.review.update(req.body)
  .then(reviewUpdated => res.send(reviewUpdated))
  .catch(next)
});
// matches DELTE requests to /api/reviews/:reviewId
router.delete('/:reviewId', function (req, res, next){
  req.review.destroy(req.body)
  .then(() => {
    res.sendStatus(204)
  })
});

module.exports = router;
