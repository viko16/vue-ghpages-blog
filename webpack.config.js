var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlguin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var pkg = require('./package.json')
var banner =
  pkg.description +
  '\n' + 'v' + pkg.version + ' (c)' + new Date().getFullYear() + ' ' + pkg.author +
  '\n' + pkg.homepage

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ],
    noParse: [
      /\.min\.js/
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: {
          stylus: ExtractTextPlugin.extract({
            loader: 'css?{discardComments:{removeAll:true}}!stylus',
            fallbackLoader: 'vue-style-loader'
          })
          // stylus: 'vue-style!css?{discardComments:{removeAll:true}}!stylus'
        }
      }
    }),
    new HtmlWebpackPlguin({
      template: path.resolve(__dirname, 'src', 'tpl.html'),
      filename: 'index.html',
      minify: {
        // https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('build.css')
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    colors: true,
    contentBase: 'dist/',
    host: '0.0.0.0'
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.BannerPlugin(banner)
  ])
}
