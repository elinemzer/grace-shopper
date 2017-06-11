const router = require('express').Router();
const Users = require('../models/users');
const Products = require('../models/products');

router.post('/login', (req, res, next) => {
  Users.findOne({
    where: {email: req.body.email},
    include: [{model: Products}]
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if(!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      }
      else {
        req.session.userId = user.id
        delete req.session.cart
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
    res.status(201).send()


});



router.post('/signup', (req, res, next) => {
  const newUserCart = req.session.cart
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
