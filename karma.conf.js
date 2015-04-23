module.exports = function (config) {
  config.set({
    'frameworks': [
      'mocha',
      'chai-as-promised',
      'chai',
      'sinon'
    ],
    'browsers': ['Chrome'],
    'files': [
      'scripts/**/__tests__/*.js'
    ],
    'preprocessors': {
      'scripts/**/__tests__/*.js': ['webpack']
    },
    'webpackMiddleware': {'noInfo': true},
    'reporters': [
      'mocha',
      'coverage',
      'notify'
    ],
    'plugins': [
      'karma-webpack',
      'karma-mocha',
      'karma-chai-as-promised',
      'karma-chai',
      'karma-sinon',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-notify-reporter'
    ],
    'coverageReporter': {
      type: 'html',
      dir: 'coverage/'
    },
    'webpack': {
      'entry': './scripts/client/index.js',
      'debug': true,
      'devtool': 'source-map',
      'output': {
        'path': './build',
        'publicPath': 'http://localhost:8080/',
        'filename': 'index.js'
      },
      'module': {
        'preLoaders': [
          {
            'test': /\.js/,
            'exclude': /(__tests__|node_modules)/,
            'loader': 'isparta-instrumenter-loader'
          }
        ],
        'loaders': [
          {
            'test': /\.js/,
            'exclude': /node_modules/,
            'loaders': ['babel']
          }
        ]
      },
      'resolve': {
        'extensions': [
          '',
          '.js'
        ]
      }
    },
    singleRun: true
  });
};
