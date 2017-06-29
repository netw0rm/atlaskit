/* eslint-disable import/no-dynamic-require */

const autoprefixer = require('autoprefixer');
const camelCase = require('camelcase');
const externalsMatcher = require('../../../build/webpack/externalsMatcher.js');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const pkg = require(path.join(process.cwd(), 'package.json'));
const loaderChain = require('../../../build/webpack/loader-chain').encode;

const isDevelopment = process.env.NODE_ENV === 'development';

function defaultPackageMains() {
  const options = new webpack.WebpackOptionsDefaulter();
  options.process({});
  return options.defaults.resolve.packageMains;
}

const root = path.join(__dirname, '..', '..');

const css = {
  camelCase: true,
  hashPrefix: `${pkg.name}${pkg.version}`,  // Avoid hash collisions
  importLoaders: 1,
  mergeRules: false,
  modules: true,
};

const tsPackageNames = glob.sync('packages/*/tsconfig.json', { cwd: root })
  .map(p => p.split('/')[1]);

if (isDevelopment) {
  css['-minimize'] = true;
  css.localIdentName = '[local]_[hash:base64:5]';
}

const standardConfig = {
  entry: {
    'dist/bundle.js': [`./${pkg['ak:webpack:raw']}`],
  },
  output: {
    path: './',
    // Comes from the key of entry.
    filename: '[name]',
    libraryTarget: 'umd',
    // This will be the name of the global in the UMD module.
    library: camelCase(pkg.name),
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx'],
    packageMains: ['ak:webpack:raw', ...defaultPackageMains()],
    alias: {
      sinon: 'sinon/pkg/sinon',
    },
  },
  noParse: [
    /sinon/,
    /ajv\.bundle\.js/,
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      [
        {
          test: /\.less$/,
          loader: loaderChain({
            'style-loader': {},
            'css-loader': css,
            'postcss-loader': {},
            'less-loader': {},
          }),
        },
      ],
      [ // exclusive configs for babel (first one that matches will be used)
        //
        // TYPESCRIPT
        // Create a separate compiler for each package, to allow independent "lib" compiler options.
        //
        ...tsPackageNames.map(name => ({
          test: new RegExp(`packages/${name}/.*\\.tsx?$`),
          exclude: /node_modules/,
          loader: loaderChain({
            'ts-loader': {
              logLevel: 'warn',
              instance: name,
            },
          }),
        })),
        //
        // Images (for storybook)
        //
        {
          test: [/\.png$/],
          loader: 'url-loader',
        },
        //
        // JAVASCRIPT (React components)
        //
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
      {
        test: /sinon\/pkg\/sinon/,
        loader: 'imports?define=>false,require=>false',
      },
    ],
  },
  postcss: () => [
    autoprefixer({
      // have a look here: https://confluence.atlassian.com/display/Cloud/Supported+browsers
      // 'not Opera' w/o version qualifier is not valid, so I chose a really high version number
      browsers: 'last 1 version, ie 11, Android > 4, not Opera < 1000',
    }),
  ],
  plugins: [],
};

standardConfig.externals = [externalsMatcher];

standardConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  include: /\.js$/, // Only remove dead code
  dead_code: true,
  mangle: false,
  beautify: true,
  comments: true,
  compress: {
    warnings: false,
  },
}));
standardConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
  // Minify any target that ends in .min.js.
  include: /\.min\.js$/,
  minimize: true,
  compress: {
    warnings: false,
  },
}));

standardConfig.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
}));

standardConfig.plugins.push(new webpack.optimize.DedupePlugin());

const productionConfig = standardConfig;

Object.assign(productionConfig.entry, {
  'dist/bundle.min.js': productionConfig.entry['dist/bundle.js'],
});

productionConfig.output.libraryTarget = 'umd';

module.exports = productionConfig;

