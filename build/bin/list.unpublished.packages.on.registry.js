#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');
const chalk = require('chalk');

const getAllPackageJsons = require('./_get_all_package_jsons');

/*
  This script is used to find packages that have not been published to npm.
*/

const REGISTRY_FULL_JSON_URL = 'https://aui-cdn.atlassian.com/atlaskit/registry/api/full.json';

function getRegistryData() {
  console.log('Fetching registry data, this may take a while...');
  return axios.get(REGISTRY_FULL_JSON_URL, { responseType: 'json' })
    .then(response => Promise.resolve(response.data));
}

function getLatestPackageFromRegistryData(registryData, packageName) {
  return registryData.components
    .find(pkg => pkg.latestPublishedVersion.name === packageName)
    // there is a bug in panop where this package doesnt contain the correct data, but we can look
    // at the rest of the known package versions and the first one will be the actual latest version
    // registry knows about
    .versions[0];
}

const packageJsons = getAllPackageJsons();

getRegistryData()
  .then((registryData) => {
    console.log(chalk.green('Successfully fetched data'));
    const packagesNotFoundInRegistry = [];
    const packagesNotUpToDateInRegistry = [];

    packageJsons.forEach((pkg) => {
      const latestOnRegistry = getLatestPackageFromRegistryData(registryData, pkg.name);
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
