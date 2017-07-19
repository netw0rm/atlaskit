/* eslint-disable no-console */
const chalk = require('chalk');

exports.info = msg => console.log(chalk.blue(msg));
exports.error = msg => console.error(chalk.red(msg));
