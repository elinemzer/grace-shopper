const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')

const db = require('./models/index.js');

app.use(morgan('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

// bundle needs this line
app.use('/files', express.static(path.join(__dirname, '../public')));


app.use(express.static(path.join(__dirname, '../node_modules')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


app.listen(3000, function () {
  console.log("listening on port 3000");
})
module.exports = app;
