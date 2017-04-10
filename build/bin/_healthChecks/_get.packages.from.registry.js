#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');

const getAllPackageJsons = require('../_get_all_package_jsons');

/*
  This package is used to collect the latest information that the registry has on each of our
  packages. It returns a promise that resolves with an array in the form:
    { name, expectedVersion, json? } where name and expected version are the
      name and version of the package locally and json is the package.json of the latest of the
      package on the registry (if it exists)
*/

const REGISTRY_FULL_JSON_URL = 'https://aui-cdn.atlassian.com/atlaskit/registry/api/full.json';

function getRegistryData() {
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

function getPackagesFromRegistry() {
  const packageJsons = getAllPackageJsons();

  return getRegistryData()
    .then((registryData) => {
      const registryResponses = [];

      packageJsons.forEach((pkg) => {
        const latestOnRegistry = getLatestPackageFromRegistryData(registryData, pkg.name);
        registryResponses.push({
          name: pkg.name,
          expectedVersion: pkg.version,
          json: latestOnRegistry,
        });
      });

      return Promise.resolve(registryResponses);
    });
}

module.exports = getPackagesFromRegistry;

/* eslint-enable no-console */
