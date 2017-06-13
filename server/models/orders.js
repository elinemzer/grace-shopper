const db = require('../db');
const Sequelize = require('sequelize');
const products = require('./products')

const orders = db.define('Order', {
	status: {
		type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
	},
	datePlaced: {
		type: Sequelize.DATE
	},
	//the following fields are used only for guest orders. User orders are shipped to the address on file for that user
	//future functionality may include assigning address to order
	email: {
		type: Sequelize.STRING,
		unique: true
	},
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
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
		type: Sequelize.STRING
	},
	zipcode: {
		type: Sequelize.STRING
	}
})

// orders.belongsToMany(products, {through: 'product_order'});

module.exports = orders;
