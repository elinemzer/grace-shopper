const db = require('../db');
const Sequelize = require('sequelize');

module.exports = db.define('Cart', {
		quantity: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
},{
	hooks:{
		afterCreate: function(cart){
			console.log('getting ready to create')
		}
	}
})
