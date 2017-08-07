#!/usr/bin/env node

module.exports = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .commandDir('scripts')
  .help('h')
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .wrap(null).argv;
