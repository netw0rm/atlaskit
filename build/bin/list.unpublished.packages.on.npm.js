#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');
const chalk = require('chalk');

const getAllPackageJsons = require('./_get_all_package_jsons');

/*
  This script is used to find packages that have not been published to npm.
*/

const BASE_NPM_CDN_URL = 'https://npmcdn.com/';

function getPackageFromNpm(packageName, packageVersion) {
  const packageUrl = `${BASE_NPM_CDN_URL}${packageName}@${packageVersion}/package.json`;
  return axios.get(packageUrl, { responseType: 'json' })
    // If the promise resolved, the package is up to date on npm
    .then(() => Promise.resolve({ name: packageName, version: packageVersion, exists: true }))
    // if there was an error, we'll resolve the promise telling with info saying it didnt exist
    .catch(() => Promise.resolve({ name: packageName, version: packageVersion, exists: false }));
}

const packageJsons = getAllPackageJsons();

Promise.all(packageJsons.map(pkg => getPackageFromNpm(pkg.name, pkg.version)))
  .then((values) => {
    const missingPackages = values.filter(pkg => !pkg.exists);
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
