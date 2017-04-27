import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

import indexRoute from './server/routes/index';
import roleRoute from './server/routes/roleRoute';
import userRoute from './server/routes/userRoute';
import documentRoute from './server/routes/documentRoute';
import swaggerRouteJson from './server/routes/swagger';
import swaggerRoute from './server/routes/swagger-ui';



const port = parseInt(process.env.PORT, 10) || 8000;

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
// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup a default catch-all route that sends back a
// welcome message in JSON format.

app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(express.static(path.join(__dirname, '/api-docs')));
app.use(indexRoute());
app.use(userRoute());
app.use(roleRoute());
app.use(documentRoute());
app.use(swaggerRouteJson());
app.use(swaggerRoute());
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
