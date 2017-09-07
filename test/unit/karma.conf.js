'use strict'

var webpack = require('webpack')
var merge = require('webpack-merge')
var baseConfig = require('../../webpack.config')

var webpackConfig = merge(baseConfig, {
  // no need for app entry during tests
  entry: undefined,
  // use inline sourcemap for karma-sourcemap-loader
  devtool: '#inline-source-map',
  // use compiler-included build
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.min.js'
    }
  },
  // testing env
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('testing')
    })
  ]
})

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai'],
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
