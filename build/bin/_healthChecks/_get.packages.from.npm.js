#!/usr/bin/env node
/* eslint-disable no-console */
const axios = require('axios');

const getAllPackageJsons = require('../_get_all_package_jsons');

/*
  This package is used to fetch the package.json's for each of our packages at their current local
  versions. It will return a promise that resolves with an array of responses in the form:
    { name, version, exists, json? } where name and version are package name and version, exists
      is a boolean for whether it was found on npm and json is the package.json returned (if it
      exists)
*/

const BASE_NPM_CDN_URL = 'https://npmcdn.com/';

function getPackageFromNpm(packageName, packageVersion) {
  const packageUrl = `${BASE_NPM_CDN_URL}${packageName}@${packageVersion}/package.json`;
  return axios.get(packageUrl, { responseType: 'json' })
    // If the promise resolved, the package is up to date on npm
    .then(pkgJson => Promise.resolve({
      name: packageName,
      version: packageVersion,
      exists: true,
      json: pkgJson,
    }))
    // if there was an error, we'll resolve the promise telling with info saying it didnt exist
    .catch(() => Promise.resolve({ name: packageName, version: packageVersion, exists: false }));
}

function getPackagesFromNpm() {
  const packageJsons = getAllPackageJsons();

  return Promise.all(packageJsons.map(pkg => getPackageFromNpm(pkg.name, pkg.version)));
}

module.exports = getPackagesFromNpm;

/* eslint-enable no-console */
