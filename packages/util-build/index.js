#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .commandDir('src')
  .help('h')
  .alias('h', 'help')
  .version()
  .alias('v', 'version')
  .wrap(null)
  .epilog(fs.readFileSync(path.join(__dirname, '/epilog.txt')).toString('utf-8'))
  .argv;
