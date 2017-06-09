const Sequelize = require('sequelize');

const Users = require('./users');
const Products = require('./products');
const Reviews = require('./reviews');
const Orders = require('./orders');
const Carts = require('./cart.js');
const Product_order = require('./product_order');
const db = require('../db')



//product_order join table
Orders.belongsToMany(Products, {through: 'Product_order'});
Products.belongsToMany(Orders, {through: 'Product_order'});

// product_cart join table
Users.belongsToMany(Products, {through: {model: Carts, unique: false}});
Products.belongsToMany(Users, {through: {model: Carts, unique: false}});
// Carts.belongsToOne(Users)
// Carts.hasOne(Products)

Users.hasMany(Reviews);
Reviews.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

Products.hasMany(Reviews);

module.exports = {Orders, Products, Reviews,
                  Users, Carts, Product_order};

// var syncedDbPromise = db.sync();

// syncedDbPromise.then(function () {
//   console.log('Sequelize models synced to PostgreSQL');
// });


//module.exports = syncedDbPromise;
