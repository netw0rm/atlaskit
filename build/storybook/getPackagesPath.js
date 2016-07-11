const path = require('path');
const lerna = require('lerna');

const BASE_PATH = path.join(__dirname, '..', '..');

module.exports = () => lerna.getPackagesPath(BASE_PATH);
