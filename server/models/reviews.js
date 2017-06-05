const db = require('../db');
const Sequelize = require('sequelize');


module.exports = db.define('review', {
	rating: {
		type: Sequelize.ENUM(1, 2, 3, 4, 5),
		allowNull: false
	},
	title: {
		type: Sequelize.STRING
	},
	content: {
		type: Sequelize.TEXT
	}
})


// many reviews to one product
// many reviews to one user
