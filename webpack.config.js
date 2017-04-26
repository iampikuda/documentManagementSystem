const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './client/src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        loaders: ['url']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'client/dist/'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
