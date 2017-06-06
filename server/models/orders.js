const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('order', {
	status: {
		type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
	},
	datePlaced: {
		type: Sequelize.DATE
	}

})


// one user to many orders
// many products to many order
