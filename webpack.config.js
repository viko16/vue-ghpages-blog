var path = require('path');
var webpack = require('webpack');

// banner info
var pkg = require('./package.json');
var d = new Date()
var date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
var banner = "vue-ghpages-blog " + pkg.version + "\n" + date + " viko16\nhttps://github.com/viko16/vue-ghpages-blog.git";

module.exports = {
    entry: './src/main',
    output: {
        path: './dist',
        publicPath: 'dist/',
        filename: 'build.js'
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
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.BannerPlugin(banner)
    ]
} else {
    module.exports.devtool = '#source-map'
}
