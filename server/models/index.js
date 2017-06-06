const Sequelize = require('sequelize');

const users = require('./users');
const products = require('./products');
const reviews = require('./reviews');
const orders = require('./orders');
const carts = require('./cart.js');
const product_order = require('./product_order');
const db = require('../db')



//product_order join table
orders.belongsToMany(products, {through: 'product_order'});
products.belongsToMany(orders, {through: 'product_order'});

// product_cart join table
products.belongsToMany(users, {through: 'cart'});
users.belongsToMany(products, {through: 'cart'});

users.hasMany(reviews);
users.hasMany(orders);

products.hasMany(reviews);

// var syncedDbPromise = db.sync();

// syncedDbPromise.then(function () {
//   console.log('Sequelize models synced to PostgreSQL');
// });


//module.exports = syncedDbPromise;

