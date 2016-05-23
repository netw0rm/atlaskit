const camelCase = require('camelcase');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const pkg = require(path.join(process.cwd(), 'package.json'));

const shouldMininimize = process.argv.indexOf('--min') !== -1;
const shouldCreateDemoBundle = process.argv.indexOf('--demo') !== -1;
const shouldBundleDependencies = process.argv.indexOf('--bundle-deps') !== -1;


const standardConfig = {
  entry: {
    'dist/bundle.js': './src/index.js'
  },
  output: {
    path: './',
    // Comes from the key of entry.
    filename: '[name]',
    libraryTarget: 'umd',
    // This will be the name of the global in the UMD module.
    library: camelCase(pkg.name)
  },
  // Only bundle dependencies that start with '.'.
  externals: fs.readdirSync('node_modules'),
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.less$/,
      loader: 'css?modules&camelCase!less'
    }, {
      loader: 'babel-loader',
      // Only run on js files from the src directory.
      test: /(src|test|demo)\/[^\/]+?\.js$/,
      query: {
        presets: 'es2015'
      }
    },{
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.js$/, // Only remove dead code
      dead_code: true,
      mangle: false,
      beautify: true,
      comments: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      // Minify any target that ends in .min.js.
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};

// Some overrides passed in by command line args.
if (shouldCreateDemoBundle) {
  //completely override the entry and point to the demo instead (which points to the src)
  standardConfig.entry = {
    'demo/bundle.js': './demo/index.js'
  };
}

if (shouldMininimize) {
  Object.assign(standardConfig.entry, {
    'dist/bundle.min.js': './src/index.js'
  });
}

if (shouldBundleDependencies) {
  delete standardConfig.externals;
}

module.exports = standardConfig;
