const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const pkg = require('./package.json')
// Adds a banner to the top of each generated chunk.
const banner = `
${pkg.description}
v${pkg.version} ©${new Date().getFullYear()} ${pkg.author}
${pkg.homepage}
`.trim()
const siteConfig = require('./src/config')

// helper
const isProd = process.env.NODE_ENV === 'production'
const resolve = (...dir) => path.resolve(__dirname, ...dir)

const config = {
  entry: './src/main.js',
  output: {
    path: resolve('dist'),
    publicPath: siteConfig.base,
    filename: isProd ? 'build.[chunkhash:5].js' : 'build.js'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      // preLoaders
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }],
        include: [resolve('src'), resolve('test')]
      },
      // Loaders
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              stylus: ExtractTextPlugin.extract({
                use: 'css-loader?{"minimize":{"discardComments":{"removeAll":true}}}!stylus-loader',
                fallback: 'vue-style-loader'
              })
            },
            esModule: false
          }
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[chunkhash:5]'
          }
        }]
      }
    ],
    noParse: [
      /\.min\.js$/,
      /es6-promise\.js$/
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Configuration
      template: resolve('src', 'tpl.html'),
      filename: 'index.html',
      minify: false,
      chunksSortMode: 'dependency',
      // Other custom metadata
      title: siteConfig.blogTitle || '',
      blogDescription: siteConfig.blogDescription || '',
      blogAuthor: siteConfig.blogAuthor || '',
      blogKeywords: siteConfig.blogKeywords || '',
      favicon: siteConfig.favicon || false,
      base: siteConfig.base || '/'
    }),
    new ExtractTextPlugin({
      filename: isProd ? 'build.[chunkhash:5].css' : 'build.css',
      disable: false,
      allChunks: true
    })
  ],
  devServer: {
    compress: true,
    contentBase: resolve('static'),
    historyApiFallback: true,
    host: '0.0.0.0',
    noInfo: true
  },
  devtool: isProd ? '#cheap-module-source-map' : '#eval-source-map'
}

// production build setting
if (isProd) {
  config.plugins = (config.plugins || []).concat([
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
    new webpack.BannerPlugin(banner),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: resolve('dist'),
        ignore: ['.*']
      }
    ])
  ])
}

module.exports = config
