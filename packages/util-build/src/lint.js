const { exec } = require('shelljs');

exports.handler = () => {
  exec('eslint --color --format ./node_modules/eslint-friendly-formatter --ext .js --ext .jsx src/ stories/ test/');
};
