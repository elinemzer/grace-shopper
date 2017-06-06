const Sequelize = require('sequelize');

// const users = require('./users');
// const products = require('./products');
// const reviews = require('./reviews');
// const orders = require('./orders');

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/grace-shopper', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
  //force: true
});


// create relationships here

module.exports = db;
