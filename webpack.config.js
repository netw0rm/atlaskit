var path = require('path');
var camelCase = require('camelcase');
var pkg = require(path.join(process.cwd(), 'package.json'));
var webpack = require('webpack');

var shouldMininimize = process.argv.indexOf('--min') !== -1;

var standardConfig = {
    entry: {
        'bundle': './index.js'
    },
    output: {
        path: './dist',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: camelCase(pkg.name)
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                loader: 'babel-loader',
                test: /\.js$/,
                query: {
                  presets: 'es2015',
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ]
};

if(shouldMininimize) {
    Object.assign(standardConfig.entry, {
        'bundle.min': './index.js'
    });
} 

module.exports = standardConfig;