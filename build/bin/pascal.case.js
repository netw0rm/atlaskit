const log = require('minilog')('');
const pascalCase = require('pascal-case');
const args = process.argv.slice(2);

require('minilog').pipe(process.stdout);

function logPascalCase(arg) {
  log(pascalCase(arg));
}

args.forEach(logPascalCase);
