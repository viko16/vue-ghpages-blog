'use strict'

var webpackConfig = require('../../webpack.config')

// no need for app entry during tests
delete webpackConfig.entry
// use inline sourcemap for karma-sourcemap-loader
webpackConfig.devtool = '#inline-source-map'

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      quiet: true
    },
    singleRun: true
  })
}
