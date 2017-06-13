const Sequelize = require('sequelize');

const db = module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/grace-shopper', {
  logging: false
});

require('./models');
