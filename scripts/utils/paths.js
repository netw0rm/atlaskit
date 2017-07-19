// @flow
const path = require('path');

const ROOT_PATH = path.join(__dirname, '..', '..');
const NODE_MODULES_PATH = path.join(ROOT_PATH, 'node_modules');
const NODE_MODULES_BIN_PATH = path.join(NODE_MODULES_PATH, '.bin');
const PACKAGES_PATH = path.join(ROOT_PATH, 'packages');

module.exports = {
  ROOT_PATH,
  NODE_MODULES_PATH,
  NODE_MODULES_BIN_PATH,
  PACKAGES_PATH,
};
