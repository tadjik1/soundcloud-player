'use strict';

var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    './scripts/client/index.js'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'client.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
