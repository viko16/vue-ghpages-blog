var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// path
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var TPL_PATH = path.resolve(SRC_PATH, 'templates');

// banner info
var pkg = require('./package.json');
var banner = pkg.name + " " + pkg.version +
            "\n" + new Date().toLocaleDateString() + " " + pkg.author +
            "\n" + pkg.homepage;

module.exports = {
    entry: {
        app: path.resolve(SRC_PATH, 'main.js'),
        vendors: ['vue', 'vue-router', 'es6-promise']
    },
    output: {
        path: BUILD_PATH,
        publicPath: 'dist/',
        filename: '[name].js',
        chunkFilename: '[chunkhash:8].js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'UnKnown Me',
            template: path.resolve(TPL_PATH, 'index.html'),
            filename: '../index.html'
        })
    ],
    vue: {
        autoprefixer: {
          browsers: ['> 1%']
        },
        loaders: {
          css: 'vue-style!css',
          less: 'vue-style!css!less'
        }
    },
    babel: {
        presets: ["es2015", "stage-2"],
        plugins: ["transform-runtime"],
        comments: false
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: 'eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    delete module.exports.devtool;

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
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new webpack.BannerPlugin(banner)
    ])
}
