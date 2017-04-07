#!/usr/bin/env node
/* eslint-disable no-console */
const semver = require('semver');
const chalk = require('chalk');

const getAllPackageJsons = require('./_get_all_package_jsons');

/*
  This script is for finding packages that depend on non-latest versions of other internal packages.

  It is intended to be run adhoc to give a quick view of potential issues.

  Pass the `--dev` flag to list stale dev dependencies instead
*/

function getLocalDep(packageJsons, packageName) {
  return packageJsons.find(pkg => pkg.name === packageName);
}

function getPackagesWithStaleDeps(packageJsons, depsToCheck) {
  const packagesWithStaleDeps = [];

  packageJsons.forEach((pkgJson) => {
    const deps = pkgJson[depsToCheck] || {};
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

const depsToCheck = process.argv[2] === '--dev' ? 'devDependencies' : 'dependencies';
const packageJsons = getAllPackageJsons();
const packagesWithStaleDeps = getPackagesWithStaleDeps(packageJsons, depsToCheck);

if (packagesWithStaleDeps.length > 0) {
  console.log(`The following packages have stale local ${depsToCheck}`);

  packagesWithStaleDeps
    // sort them so that worst offenders are listed first
    .sort((a, b) => b.deps.length - a.deps.length)
    .forEach((pkg) => {
      console.log(`${chalk.blue(pkg.packageName)}:`);
      pkg.deps
        .forEach(dep => console.log(`  - ${chalk.yellow(dep.name)}:${chalk.red(dep.expectedVersion)} (latest: ${chalk.green(dep.localVersion)})`));
    });
} else {
  console.log(chalk.green(`All local ${depsToCheck} are up to date!`));
}

/* eslint-enable no-console */
