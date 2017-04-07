#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');
const getAllPackageJsons = require('../_get_all_package_jsons');

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

function getBrokenStorybooks() {
  const packageJsons = getAllPackageJsons();

  // We map each of the packageJsons to return a promise. The promise will either resolve with
  // undefined (if we successfully find the storybook) or a url (if we failed to find it)
  return Promise.all(packageJsons.map(pkg => getPackageStorybook(pkg.name, pkg.version)))
    .then((allStorybooks) => {
      const brokenStorybooks = allStorybooks.filter(pkg => !pkg.exists);
      return Promise.resolve(brokenStorybooks);
    });
}

module.exports = getBrokenStorybooks;

/* eslint-enable no-console */
