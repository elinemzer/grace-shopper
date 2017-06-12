const Sequelize = require('sequelize')
const db = require('../db')


module.exports = db.define('Product_order', {
	quantity: Sequelize.INTEGER,
	price: Sequelize.DECIMAL(10,2)
})
