const db = require('../db');
const Sequelize = require('sequelize');


module.exports = db.define('Review', {
	rating: {
		type: Sequelize.ENUM(1, 2, 3, 4, 5),
		allowNull: false
	},
	title: {
		type: Sequelize.STRING
	},
	content: {
		type: Sequelize.TEXT,
		validate: {
			len: {
				args: 10,
				msg: 'Put in some more effort! Review must be at least ten characters!'
			}
		}
	}
})
