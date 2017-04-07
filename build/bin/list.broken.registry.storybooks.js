#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');
const chalk = require('chalk');

const getAllPackageJsons = require('./_get_all_package_jsons');

/*
  This script is used to find broken storybooks in the registry. This can occur for several reasons.

  It would be nice if we could simply give the user the git commit command they could copy and paste
  to re-release but we'd have reimpliment the line wrapping behaviour that exists in commitizen for
  this. This is a fair compromise
*/

const BASE_STORIES_URL = 'https://aui-cdn.atlassian.com/atlaskit/stories/';

function getPackageStorybook(packageName, packageVersion) {
  const storybookURL = `${BASE_STORIES_URL}${packageName}/${packageVersion}/`;
  return axios.head(storybookURL)
    // If the promise resolved, the storybook is there
    .then(() => Promise.resolve({ name: packageName, exists: true }))
    // If it errored, we still resolve the promise so we can pass the packageName back
    .catch(() => Promise.resolve({ name: packageName, exists: false, url: storybookURL }));
}

const packageJsons = getAllPackageJsons();

// We map each of the packageJsons to return a promise. The promise will either resolve with
// undefined (if we successfully find the storybook) or a url (if we failed to find it)
Promise.all(packageJsons.map(pkg => getPackageStorybook(pkg.name, pkg.version)))
  .then((values) => {
    const brokenPackages = values.filter(pkg => !pkg.exists);
    if (brokenPackages.length > 0) {
      console.log(chalk.red('Failed to find the following storybooks:'));
      brokenPackages.forEach(pkg => console.log(`  ${pkg.url}`));

      console.log();
      console.log('If you would like to re-release these storybooks you can run' +
        ` ${chalk.blue('yarn run commit')}, select ${chalk.blue('fix')}, select ${chalk.blue('dummy')},` +
        ` make the message ${chalk.blue('dummy commit to fix storybook')} and select each of the affected packages`);
    }
  })
  .catch((err) => {
    console.log(`Something went wrong!  ${err}`);
  });

/* eslint-enable no-console */
