#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require('chalk');

const getLocalPackageJsons = require('./_get.packages.from.local');
const getPackagesFromNpm = require('./_get.packages.from.npm').getPackagesFromNpmAtVersion;

/*
  This script is used to find packages that are not published to npm. This can occur if, during a
  build, we successfully bump a package version and commit, but fail to publish the package (i.e
  a network failure during publish).
*/

const localPackages = getLocalPackageJsons();

// This will fetch the package.jsons for each of our packages at the versoions we have locally
getPackagesFromNpm(localPackages)
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
