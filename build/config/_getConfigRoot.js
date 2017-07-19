const path = require('path');
const pkgUp = require('pkg-up'); // eslint-disable-line import/no-extraneous-dependencies

function getConfigRoot(cwd) {
  return path.dirname(pkgUp.sync(cwd));
}

module.exports = getConfigRoot;
