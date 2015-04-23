'use strict';

var webpack = require('webpack');
var config = require('./utilities/webpack.config');
var compiler = webpack(config);

compiler.run(function () {
// stay silent
});
