const router = require('express').Router();
const Users = require('../models/users');

router.post('/login', (req, res, next) => {
  Users.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) res.status(401).send('User not found');
      else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.session.userId = user.id
        req.login(user, err => {
          if (err) next(err);
          else res.json(user);
        });
      }
    })

    .catch(next);
});

router.post('/signup', (req, res, next) => {
  Users.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    })
    .then((user)=>{
      if(!user){
        res.sendStatus(401);
      } else {
        req.session.userId = user.id
        res.sendStatus(200)
      }

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
