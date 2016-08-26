const path = require('path');
const log = require('minilog')('externalsMatcher');
// enable the next line to debug
// require('minilog').enable();

const BABEL_RUNTIME_PATH = path.resolve(__dirname, '..', '..', 'node_modules', 'babel-runtime');

module.exports = (context, request, callback) => {
  log.info(context, request);
  const internal = (because = '') => {
    log.info(`internal: ${request} ${because}`);
    callback();
  };

  if (/^babel-runtime/.test(request)) {
    internal('because babel-runtime is a dependency from the atlaskit main repo');
    return;
  }

  if (context.indexOf(BABEL_RUNTIME_PATH) === 0) {
    internal('because it is part of babel-runtime');
    return;
  }

  if (/^\./.test(request)) {
    internal();
    return;
  }
  if (/!/.test(request)) {
    internal();
    return;
  }

  log.info(`external: ${request}`);
  callback(null, request);
};

module.exports.BABEL_RUNTIME_PATH = BABEL_RUNTIME_PATH;
