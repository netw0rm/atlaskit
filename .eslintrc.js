const config = require('./build/storybook-nwb/webpack.config');

module.exports = {
  root: true,
  extends: '@atlaskit/eslint-config-base',
  settings: {
    'import/resolver': {
      webpack: { config }
    }
  }
};
