// @flow
const logger = require('./utils/logger');
const lerna = require('./utils/lerna');

const LERNA_SCOPE = process.argv[2];
const LERNA_ARGS = process.argv.slice(3);

if (!LERNA_SCOPE) {
  logger.error('No scope given');
  process.exit(1);
}

logger.info('Cleaning package(s) for bootstraping');

// clean the package(s) first
lerna.execScoped(LERNA_SCOPE, LERNA_ARGS, ['git', 'clean', '-Xdf', '.']).then(() => {
  logger.info('bootstraping package(s)');

  // then bootstrap it
  // (passing on extra args for things like --include-filtered-dependencies)
  return lerna.bootstrapScoped(LERNA_SCOPE, LERNA_ARGS);
});
