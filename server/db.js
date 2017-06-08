const Sequelize = require('sequelize');

const db = module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/grace-shopper', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
  //force: true
});

require('./models');
