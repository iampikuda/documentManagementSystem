module.exports = {
  context: `${__dirname}/app`,

  entry: './js/app.js',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/app`,
  }
};

// const webpack = require('webpack');
// const path = require('path');

// module.exports = {
//   entry: [
//     './client/src/index'
//   ],
//   module: {
//     loaders: [
//       {
//         test: /\.js?$/,
//         loader: 'babel',
//         exclude: /node_modules/,
//         query: {
//           presets: ['react']
//         }
//       },
//       {
//         test: /\.jsx$/,
//         loader: 'babel',
//         exclude: /node_modules/,
//         query: {
//           presets: ['react']
//         }
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['', '.js', 'jsx']
//   },
//   output: {
//     path: path.join(__dirname, 'client/dist/'),
//     publicPath: '/app/',
//     filename: 'bundle.js'
//   },
//   devServer: {
//     contentBase: './client/dist',
//     hot: true
//   },
//   plugins: [
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin()
//   ]
// };
