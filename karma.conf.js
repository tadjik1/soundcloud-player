module.exports = function (config) {
  config.set({
    'frameworks': [
      'mocha',
      'chai-as-promised',
      'chai',
      'sinon'
    ],
    'browsers': ['Firefox'],
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
      'karma-firefox-launcher',
      'karma-mocha-reporter',
      'karma-coverage',
      'karma-notify-reporter'
    ],
    'coverageReporter': {
      dir: 'coverage/',
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'}
      ]
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
