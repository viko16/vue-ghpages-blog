var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var TPL_PATH = path.resolve(SRC_PATH, 'templates');

// banner info
var pkg = require('./package.json');
var d = new Date()
var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
var banner = "vue-ghpages-blog " + pkg.version + "\n" + date + " viko16\nhttps://github.com/viko16/vue-ghpages-blog.git";

module.exports = {
    entry: {
        app: path.resolve(SRC_PATH, 'main.js'),
        vendors: ['vue', 'vue-router', 'marked']
    },
    output: {
        path: './',
        // publicPath: 'dist/',
        filename: 'dist/[name].js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'UnKnown Me',
            template: path.resolve(TPL_PATH, 'index.html')
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
        new webpack.optimize.CommonsChunkPlugin('vendors', 'dist/vendor.js'),
        new webpack.BannerPlugin(banner)
    ])
}
