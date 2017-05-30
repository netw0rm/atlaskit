const config = require('./build/webpack.config');

module.exports = {
  root: true,
  extends: '@atlaskit/eslint-config-base',
  settings: {
    'import/resolver': {
      webpack: { config }
    }
  }
};
