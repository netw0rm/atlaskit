#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require('chalk');
const Table = require('cli-table2');

/* This script is to run a few automated consistency checks against the repo
      - Shows local versions vs npm versions, vs registry versions
      - Shows broken storybooks on registry
*/

const getLocalPackages = require('./_healthChecks/_get.packages.from.local');
const getPackagesFromNpm = require('./_healthChecks/_get.packages.from.npm').getLatestPackagesFromNpm;
const getPackagesFromRegistry = require('./_healthChecks/_get.packages.from.registry').getLatestPackagesFromRegistry;
const getStorybooksFromRegistry = require('./_healthChecks/_get.storybooks.from.registry');

const showAllPackages = process.argv[2] === '--show-all';

let npmPackages;
let registryPackages;
let registryStorybooks;

console.log('Fetching package information from local packages...');
const localPackages = getLocalPackages();
console.log(chalk.green(`Successfully fetched data for ${localPackages.length} packages`));

console.log('Fetching package information from npm...');
getPackagesFromNpm(localPackages)
  .then((npmResponses) => {
    console.log(chalk.green(`Successfully fetched data for ${npmResponses.length} packages`));
    npmPackages = npmResponses;

    console.log('Fetching data from Atlaskit regsitry...');
    return getPackagesFromRegistry(localPackages);
  })
  .then((registryResponses) => {
    console.log(chalk.green(`Successfully fetched data for ${registryResponses.length} packages`));
    registryPackages = registryResponses;

    console.log('Fetching storybooks from registry...');
    return getStorybooksFromRegistry(localPackages);
  })
  .then((storybookData) => {
    console.log(chalk.green(`Successfully fetched data for ${storybookData.length} packages`));
    registryStorybooks = storybookData;

    // now we can combine all the data
    let combinedData = localPackages.map((pkg) => {
      const npmPkg = npmPackages.find(p => p.name === pkg.name);
      const registryPkg = registryPackages.find(p => p.name === pkg.name);
      const storybookExists = registryStorybooks.find(p => p.name === pkg.name).exists;

      return {
        name: pkg.name,
        localVersion: pkg.version,
        npmVersion: npmPkg.exists ? npmPkg.json.version : '--',
        registryVersion: registryPkg.exists ? registryPkg.json.version : '--',
        storybookExists,
      };
    });

    // Unless the user requests all output, filter to package that have errors
    if (!showAllPackages) {
      console.log('filtering');
      combinedData = combinedData.filter(pkg => pkg.npmVersion !== pkg.localVersion ||
        pkg.registryVersion !== pkg.localVersion ||
        !pkg.storybookExists
      );
    }

    const table = new Table({
      head: ['Package', 'Local', 'NPM', 'Registry', 'Storybook'],
    });

    combinedData.forEach((pkg) => {
      // we'll use chalk to make the output nice and readable
      const name = chalk.white(pkg.name);
      const localVersion = chalk.white(pkg.localVersion);
      const npmVersion = pkg.npmVersion === pkg.localVersion ?
        chalk.green(pkg.npmVersion) :
        chalk.red(pkg.npmVersion);
      const registryVersion = pkg.registryVersion === pkg.localVersion ?
        chalk.green(pkg.registryVersion) :
        chalk.red(pkg.registryVersion);
      const storybookExists = pkg.storybookExists ?
        chalk.green(pkg.storybookExists) :
        chalk.red(pkg.storybookExists);
      table.push([name, localVersion, npmVersion, registryVersion, storybookExists]);
    });

    console.log(table.toString());
  });

/* eslint-enable no-console */
