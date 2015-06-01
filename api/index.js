var webpack = require('webpack');
var config = require('./webpack.config');

var compiler = webpack(config);

compiler.run(function (err, stats) {
	if(err)
  	console.error(err);
	else
    var jsonStats = stats.toJson();
    if(jsonStats.errors.length > 0)
			console.warn(jsonStats.errors);
    if(jsonStats.warnings.length > 0)
      console.warn(jsonStats.warnings);
    console.log('success');
});
