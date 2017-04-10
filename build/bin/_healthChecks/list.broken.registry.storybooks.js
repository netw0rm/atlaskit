#!/usr/bin/env node
/* eslint-disable no-console */
const chalk = require('chalk');
const getLocalPackageJsons = require('./_get.packages.from.local');
const getStorybooksFromRegistry = require('./_get.storybooks.from.registry');

/*
  This script is used to find broken storybooks in the registry. This can occur for several reasons.

  It would be nice if we could simply give the user the git commit command they could copy and paste
  to re-release but we'd have reimpliment the line wrapping behaviour that exists in commitizen for
  this. This is a fair compromise
*/

const localPackages = getLocalPackageJsons();

getStorybooksFromRegistry(localPackages)
  .then((storybookResponses) => {
    const brokenStorybooks = storybookResponses.filter(response => !response.exists);
    if (brokenStorybooks.length > 0) {
      console.log(chalk.red('Failed to find the following storybooks:'));
      brokenStorybooks.forEach(pkg => console.log(`  ${pkg.url}`));

      console.log();
      console.log('If you would like to re-release these storybooks you can run' +
        ` ${chalk.blue('yarn run commit')}, select ${chalk.blue('fix')}, select ${chalk.blue('dummy')},` +
        ` make the message ${chalk.blue('dummy commit to fix storybook')} and select each of the affected packages`);
    } else {
      console.log(chalk.green('All storybooks found successfully!'));
    }
  })
  .catch((err) => {
    console.log(`Something went wrong!  ${err}`);
  });
/* eslint-enable no-console */
