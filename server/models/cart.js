const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('cart', {
		quantity: {
		type: Sequelize.INTEGER
	}
})