const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('product', {
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	region: {
		type: Sequelize.ENUM('North America', 'South America', 'Asia', 'Europe', 'Africa', 'Australia'),
		allowNull: false
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: '/default.png' // remember to deal with this - add a pic with this name in the public folder
	},
	price: {
		type: Sequelize.DECIMAL(10, 2)
	}
})


// one product to many reviews
// many products to many carts
// many products to many orders
