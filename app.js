const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 8000;

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a
// welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));
app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
