#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');

/*
  This package ss used to collect responses from attempting to reach each storybook in the registry
  It will return an array of objects in the form:
    { name, exists, url } where name is the packageName, exists is true if the storybook exists and
      url is the url of the storybook.

  usage:
*/

const BASE_STORIES_URL = 'https://aui-cdn.atlassian.com/atlaskit/stories/';

function getPackageStorybook(packageName, packageVersion) {
  const storybookURL = `${BASE_STORIES_URL}${packageName}/${packageVersion}/`;
  return axios.head(storybookURL)
    // If the promise resolved, the storybook is there
    .then(() => Promise.resolve({ name: packageName, exists: true, url: storybookURL }))
    // If it errored, we still resolve the promise so we can pass the packageName back
    .catch(() => Promise.resolve({ name: packageName, exists: false, url: storybookURL }));
}

function getStorybooksFromRegistry(packages) {
  // we return once all the promises are resolved
  return Promise.all(packages.map(pkg => getPackageStorybook(pkg.name, pkg.version)));
}

module.exports = getStorybooksFromRegistry;

/* eslint-enable no-console */
