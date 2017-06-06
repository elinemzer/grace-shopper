const Sequelize = require('sequelize');

const users = require('./users');
const products = require('./products');
const reviews = require('./reviews');
const orders = require('./orders');
const carts = require('./cart.js');
const product_order = require('./product_order');
const db = require('../db')

// const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/grace-shopper', {
//   logging: false, // unless you like the logs
//   // ...and there are many other options you may want to play with
//   force: true
// });



// // create relationships here

//product_order join table
orders.belongsToMany(products, {through: 'product_order'});
products.belongsToMany(orders, {through: 'product_order'});

//product_cart join table
products.belongsToMany(users, {through: 'cart'});
users.belongsToMany(products, {through: 'cart'});

users.hasMany(reviews);
users.hasMany(orders);
// users.hasOne(carts);
products.hasMany(reviews);

var syncedDbPromise = db.sync();

syncedDbPromise.then(function () {
  console.log('Sequelize models synced to PostgreSQL');
});

module.exports = syncedDbPromise;


// module.exports = db;
