import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

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

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
