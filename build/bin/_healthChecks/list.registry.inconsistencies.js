#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require('chalk');

const getAllPackageJsons = require('../_get_all_package_jsons');
const getPackagesFromRegistry = require('./_get.packages.from.registry');

/*
  This script is used to find inconsistencies between our local versions of packages and the ones
  on the registry. It will output packages that were not found and packages that were not the
  correct version.
*/

const packageJsons = getAllPackageJsons();

console.log('Fetching registry data, this may take a while...');

getPackagesFromRegistry()
  .then((registryData) => {
    console.log(chalk.green('Successfully fetched data'));
    const packagesNotFoundInRegistry = [];
    const packagesNotUpToDateInRegistry = [];

    packageJsons.forEach((pkg) => {
      const latestOnRegistry = registryData
        // map over it to get the actual json from the response
        .map(pkgData => pkgData.json)
        .find(pkgData => !!pkgData && pkgData.name === pkg.name);
      if (!latestOnRegistry) {
        packagesNotFoundInRegistry.push(pkg);
      } else if (latestOnRegistry.version !== pkg.version) {
        packagesNotUpToDateInRegistry.push({
          name: pkg.name,
          expectedVersion: pkg.version,
          registryVersion: latestOnRegistry.version,
        });
      }
    });

    if (packagesNotFoundInRegistry.length > 0) {
      console.log('Folowing packages were not found on the registry:');
      packagesNotFoundInRegistry
        .forEach(pkg => console.log(` ${chalk.red(pkg.name)}`));
      console.log();
    }
    if (packagesNotUpToDateInRegistry.length > 0) {
      console.log('Following packages do not match the versions found in the registry');
      packagesNotUpToDateInRegistry
        .forEach(pkg => console.log(` ${chalk.blue(pkg.name)} - expected: ${chalk.blue(pkg.expectedVersion)} - found ${chalk.red(pkg.registryVersion)}`));
    }
  })
  .catch(err => console.log(`Something went wrong: ${err}`));

/* eslint-enable no-console */
