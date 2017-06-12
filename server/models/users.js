const db = require('../db');
const Sequelize = require('sequelize');
const crypto = require('crypto')
const _ = require('lodash');

var Users = db.define('Users', {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING
	},

	googleId: Sequelize.STRING,

	salt: {
		type: Sequelize.STRING
	},
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
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
	},
	passwordReset:{
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
},{
	instanceMethods: {
		sanitize: function () {
      return _.omit(this.toJSON(), ['password', 'salt']);
    },

    correctPassword: function (candidatePassword) {
      return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
    }
	},
	classMethods: {
		generateSalt: function () {
      return crypto.randomBytes(16).toString('base64');
    },
    encryptPassword: function (plainText, salt) {
      const hash = crypto.createHash('sha1');
      hash.update(plainText);
      hash.update(salt);
      return hash.digest('hex');
    }
	},
	hooks: {
		beforeCreate: setSaltAndPassword,
		beforeUpdate: setSaltAndPassword
	}
})

function setSaltAndPassword (user) {
	if (user.changed('password')) {
    user.salt = user.Model.generateSalt();
    user.password = user.Model.encryptPassword(user.password, user.salt);
  }
}



module.exports = Users;
