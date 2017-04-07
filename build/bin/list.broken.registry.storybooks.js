#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const axios = require('axios');

/*
  This script is used to find broken storybooks in the registry. This can occur for several reasons.
  The simplest way to fix one is push a dummy commit ("chore(dummy): ...") that affects the packages
  that need to be re-released.
*/

const BASE_STORIES_URL = 'https://aui-cdn.atlassian.com/atlaskit/stories/';

function getAllPackageJsons() {
  const packagesDir = path.join(__dirname, '..', '..', 'packages');
  const packages = fs.readdirSync(packagesDir)
    .filter(file => fs.statSync(path.join(packagesDir, file)).isDirectory());
  const packageJsons = [];
  packages.forEach((pkg) => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(packagesDir, pkg, 'package.json')));
    packageJsons.push(packageJson);
  });
  return packageJsons;
}

function getPackageStorybook(packageName, packageVersion) {
  const storybookURL = `${BASE_STORIES_URL}${packageName}/${packageVersion}/`;
  return axios.head(storybookURL)
    // If the promise resolved, we return undefined so that we can filter it out later
    .then(() => Promise.resolve(undefined))
    // If it errored, we resolve the promise so that we can return the offending URL
    .catch(() => Promise.resolve(storybookURL));
}

const packageJsons = getAllPackageJsons();

// We map each of the packageJsons to return a promise. The promise will either resolve with
// undefined (if we successfully find the storybook) or a url (if we failed to find it)
Promise.all(packageJsons.map(pkg => getPackageStorybook(pkg.name, pkg.version)))
  .then((values) => {
    // remove all the undefined values
    const brokenStorybookUrls = values.filter(value => !!value);
    if (brokenStorybookUrls.length > 0) {
      console.log('Failed to find the following storybooks:');
      brokenStorybookUrls.forEach(url => console.log(`  ${url}`));
    }
  })
  .catch((err) => {
    console.log(`Something went wrong!  ${err}`);
  });

/* eslint-enable no-console */
