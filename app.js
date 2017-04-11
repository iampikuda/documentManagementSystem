import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import indexRoute from './server/routes/index';
// import roleRoute from './server/routes/roleRoute';
import userRoute from './server/routes/userRoute';
// import documentRoute from './server/routes/documentRoute';




const port = parseInt(process.env.PORT, 10) || 8000;
// const userRoute = require('./server/routes/userRoute');
// const roleRoute = require('./server/routes/roleRoute');
// const indexRoute = require('./server/routes/index');
// const documentRoute = require('./server/routes/documentRoute');


// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a
// welcome message in JSON format.
app.use(indexRoute());
app.use(userRoute());
// app.use('/role', roleRoute);
// app.use('/document', documentRoute);

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
