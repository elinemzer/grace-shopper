const Sequelize = require('Sequelize')
const db = require('../db')


module.exports = db.define('product_order', {
	quantity: Sequelize.INTEGER,
	price: Sequelize.DECIMAL(10,2)
})
