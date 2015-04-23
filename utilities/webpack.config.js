'use strict';

var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./scripts/client/index.js']
  },
  output: {
    path: __dirname + '/build',
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
