const path = require('path');
const { spawn } = require('./processes');
const { NODE_MODULES_BIN_PATH } = require('./paths');

const LERNA_BIN = path.join(NODE_MODULES_BIN_PATH, 'lerna');

function bootstrap(lernaArgs, opts) {
  let args = ['bootstrap'];

  if (lernaArgs) {
    args = args.concat(lernaArgs);
  }

  return spawn(LERNA_BIN, args, opts);
}

function bootstrapScoped(scope, lernaArgs, opts) {
  let finalLernaArgs = ['--scope', scope];

  if (lernaArgs) {
    finalLernaArgs = finalLernaArgs.concat(lernaArgs);
  }

  return bootstrap(finalLernaArgs, opts);
}

function exec(lernaArgs, commandArgs, opts) {
  let args = ['exec'];

  if (lernaArgs) {
    args = args.concat(lernaArgs);
  }

  args.push('--');

  if (commandArgs) {
    args = args.concat(commandArgs);
  }

  return spawn(LERNA_BIN, args, opts);
}

function execScoped(scope, lernaArgs, commandArgs, opts) {
  let finalLernaArgs = ['--scope', scope];

  if (lernaArgs) {
    finalLernaArgs = finalLernaArgs.concat(lernaArgs);
  }

  return exec(finalLernaArgs, commandArgs, opts);
}

module.exports = {
  bootstrap,
  bootstrapScoped,
  exec,
  execScoped,
};
