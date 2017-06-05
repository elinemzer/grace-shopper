const db = require('../db');
console.log(db);
const Sequelize = require('sequelize');

module.exports = db.define('user', {
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
},
{
	// options
})
// users will have a one-to-one relationship with cart
// (if a user is not logged in, adds things to cart, then logs in,
// merge the single stored cart for that user with the local storage cart)

