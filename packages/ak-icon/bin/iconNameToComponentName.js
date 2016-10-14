const pascalCase = require('pascal-case');

module.exports = iconName => `${pascalCase(iconName)}Icon`;
