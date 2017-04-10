#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require('chalk');

const getPackagesFromNpm = require('./_get.packages.from.npm');

/*
  This script is used to find packages that have not been published to npm.
*/

getPackagesFromNpm()
  .then((npmResponses) => {
    const missingPackages = npmResponses.filter(pkg => !pkg.exists);
    if (missingPackages.length > 0) {
      console.log(chalk.red('Failed to find the following packages on npm:'));
      missingPackages.forEach(pkg => console.log(`${chalk.blue(pkg.name)}@${chalk.red(pkg.version)}`));

      console.log();
      console.log('There may have been an issue during prepublish. Check the relevant build logs for more information.');
    }
  })
  .catch((err) => {
    console.log(`Something went wrong!  ${err}`);
  });

/* eslint-enable no-console */
