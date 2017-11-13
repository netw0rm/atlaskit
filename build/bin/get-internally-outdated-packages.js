#!/usr/bin/env node
const semver = require('semver');
const chalk = require('chalk');
const getLocalPackages = require('./utility/get.packages.from.local');
const getPackageFromNpm = require('./utility/get.packages.from.npm').getPackageFromNpm;

const log = {
  section: (title) => console.log(`\n✨ ${chalk.bold.magenta(title)}\n`),
  success: (message) => console.log(chalk.green(`${message}`)),
  sad: (message) => console.log(chalk.yellow(`😭 ${message}`)),
  dim: (message) => console.log(chalk.dim(message)),
};

const getAtlaskitDependencies = (dependencies) =>
  dependencies.filter(dep => dep.indexOf('@atlaskit') === 0);

log.section('Getting local packages');
const localPackages = getLocalPackages();
log.success(`Found ${localPackages.length} local packages`);

const getLatestVersion = (() => {
  const cache = {};

  return (packageName) => {
  // already found the latest version peviously
    if (cache[packageName]) {
      return Promise.resolve(cache[packageName]);
    }

    return getPackageFromNpm(packageName)
    .then(result => {
      if (result.exists) {
        const version = result.json.version;
        cache[packageName] = version;
        return cache[packageName];
      }

      // Package not found on npm
      // try to find it locally
      const local = localPackages.find(item => item.name === packageName);

      if (!local) {
        throw new Error(`Could not find ${packageName} on npm or locally`);
      }

      const version = local.version;
      log.dim(`Could not find ${packageName} on npm - using local version ${version}`);

      cache[packageName] = version;
      return cache[packageName];
    });
  };
})();

log.section('Comparing local version against latest version from npm');

localPackages.forEach(localPackage => {
  const dependencies = getAtlaskitDependencies(
    localPackage.dependencies ? Object.keys(localPackage.dependencies) : []
  );

  const promises = dependencies.map((name) =>
    getLatestVersion(name).then(latestVersion => ({
      name,
      latestVersion,
      localVersion: localPackage.dependencies[name],
    })));

  Promise.all(promises).then((snapshots) => {
    const outdated = snapshots.filter(
      snapshot => !semver.satisfies(snapshot.latestVersion, snapshot.localVersion)
    );

    if (!outdated.length) {
      log.success(`${localPackage.name} is up to date!`);
      return;
    }

    log.sad(`${localPackage.name} is not up to date`);
    outdated.forEach(snapshot => {
      console.log(`  - ${snapshot.name}: local: ${chalk.red(snapshot.localVersion)} latest: ${chalk.green(snapshot.latestVersion)}`);
    });
  });
});
