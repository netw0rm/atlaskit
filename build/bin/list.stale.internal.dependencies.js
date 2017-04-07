#!/usr/bin/env node
/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const semver = require('semver');
const chalk = require('chalk');

/*
  This script is for finding packages that depend on non-latest versions of other internal packages.

  It is intended to be run adhoc to give a quick view of potential issues.
*/

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

function getLocalDep(packageJsons, packageName) {
  return packageJsons.find(pkg => pkg.name === packageName);
}

function getPackagesWithStaleDeps(packageJsons) {
  const packagesWithStaleDeps = [];

  packageJsons.forEach((pkgJson) => {
    const deps = pkgJson.dependencies;
    const staleDeps = [];
    Object.keys(deps).forEach((depName) => {
      const localDep = getLocalDep(packageJsons, depName);
      if (localDep) {
        if (!semver.satisfies(localDep.version, deps[depName])) {
          staleDeps.push({
            name: depName,
            expectedVersion: deps[depName],
            localVersion: localDep.version,
          });
        }
      }
    });
    if (staleDeps.length > 0) {
      packagesWithStaleDeps.push({
        packageName: pkgJson.name,
        deps: staleDeps,
      });
    }
  });

  return packagesWithStaleDeps;
}

const packageJsons = getAllPackageJsons();
const packagesWithStaleDeps = getPackagesWithStaleDeps(packageJsons);

if (packagesWithStaleDeps.length > 0) {
  console.log('The following packages have stale local dependencies');

  packagesWithStaleDeps
    // sort them so that worst offenders are listed first
    .sort((a, b) => b.deps.length - a.deps.length)
    .forEach((pkg) => {
      console.log(`${chalk.blue(pkg.packageName)}:`);
      pkg.deps
        .forEach(dep => console.log(`  - ${chalk.yellow(dep.name)}:${chalk.red(dep.expectedVersion)} (latest: ${chalk.green(dep.localVersion)})`));
    });
} else {
  console.log(chalk.green('All local dependencies are up to date!'));
}

/* eslint-enable no-console */
