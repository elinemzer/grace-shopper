const db = require('../db');
const Sequelize = require('sequelize');
const products = require('./products')

const orders = db.define('Order', {
	status: {
		type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
	},
	datePlaced: {
		type: Sequelize.DATE
	}
})

// orders.belongsToMany(products, {through: 'product_order'});

module.exports = orders;
