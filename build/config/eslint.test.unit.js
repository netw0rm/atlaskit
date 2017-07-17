module.exports = {
  extends: [
    '@atlaskit/eslint-config-base',
    'plugin:jest/recommended',
  ],
  env: {
    'jest/globals': true,
  },
  plugins: [
    'jest',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'jest/no-identical-title': 'warn',
  },
};
