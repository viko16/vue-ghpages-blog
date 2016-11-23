const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const pkg = require('./package.json')
// Adds a banner to the top of each generated chunk.
const banner = `
${pkg.description}
v${pkg.version} ©${new Date().getFullYear()} ${pkg.author}
${pkg.homepage}
`.trim()

const isProd = process.env.NODE_ENV === 'production'

const conf = require('./src/conf.json')
const favicon = conf.favicon ? path.resolve(__dirname, './src/conf.json', conf.favicon) : false

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: isProd ? 'build.[chunkhash:5].js' : 'build.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [
      // preLoaders
      {
        test: /\.vue$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      // Loaders
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[chunkhash:5]'
        }
      }
    ],
    noParse: [
      /\.min\.js$/,
      /es6-promise\.js$/
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        loaders: {
          stylus: ExtractTextPlugin.extract({
            loader: 'css-loader?{discardComments:{removeAll:true}}!stylus-loader',
            fallbackLoader: 'vue-style-loader'
          })
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'tpl.html'),
      filename: 'index.html',
      favicon: favicon,
      minify: {
        // https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin({
      filename: isProd ? 'build.[chunkhash:5].css' : 'build.css',
      disable: false,
      allChunks: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: 'dist/',
    host: '0.0.0.0'
  },
  devtool: isProd ? false : '#eval-source-map'
}

// production build setting
if (isProd) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
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
