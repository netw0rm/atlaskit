const path = require('path');

module.exports = {
  root: true,
  extends: '@atlaskit/eslint-config-base',
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, 'build', 'webpack', 'development.js'),
      },
    },
  },
};
