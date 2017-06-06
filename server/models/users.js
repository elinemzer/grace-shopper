const db = require('../db');
const Sequelize = require('sequelize');
const reviews = require('./reviews')
const orders = require('./orders')
const products = require('./products')

var users = db.define('user', {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	address1: {
		type: Sequelize.STRING
	},
	address2: {
		type: Sequelize.STRING
	},
	city: {
		type: Sequelize.STRING
	},
	state: {
		type: Sequelize.STRING,
		validate: {
			len: [2,2]
		}
	},
	zipcode: {
		type: Sequelize.STRING,
		validate: {
			len: [5,5]
		}
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})


// users.hasMany(reviews);
// users.hasMany(orders);
// users.belongsToMany(products, {through: 'cart'});

module.exports = users;