/* eslint-disable no-console */
const { default: io } = require('lerna-semantic-release-io');
const srRegistry = require('semantic-release/src/lib/get-registry');
const npmconf = require('npmconf');

const getNextRelease = (pkg, sharedConfig, npmConfig, location) => {
  // eslint-disable-next-line
  const config = Object.assign(
    {
      options: {
        branch: (pkg.release && pkg.release.branch) || 'master',
      },
    },
    sharedConfig,
    { pkg },
    // eslint-disable-next-line
    { npm: Object.assign(
      {
        registry: srRegistry(pkg, npmConfig),
        tag: (pkg.publishConfig || {}).tag || npmConfig.get('tag') || 'latest',
      },
      sharedConfig.npm
    ) }
  );
  return new Promise((res, rej) => {
    io.semanticRelease.pre(config, (err, nextRelease) => (
      err ? rej(err) : res({ nextRelease, pkg, location })
    ));
  }).catch((e) => {
    if (e.code === 'ENOCHANGE') return null;
    // WARNING: The following exception was only here to help test. DO NOT merge in to master.
    if (e.code === 'ENOTINHISTORY') {
      console.warn('ERROR: You are likely trying to release from a branch not up to date with master.');
      return null;
    }
    console.log('ERROR ERROR ERROR', e);
    throw e;
  });
};

async function findNextReleaseInfoForAk() {
  const npmConfig = await new Promise((resolve) => {
    npmconf.load({}, (err, config) => (
      resolve(config)
    ));
  });

  npmConfig.set('loglevel', 'silent');

  const sharedConfig = {
    env: process.env,
    plugins: io.semanticRelease.plugins,
    npm: {
      auth: {
        token: process.env.NPM_TOKEN,
      },
      loglevel: npmConfig.get('loglevel'),
    },
  };

  const packages = io.lerna.getAllPackages();

  const nextReleases = await Promise.all(packages.map(pkg => (
    // eslint-disable-next-line
    getNextRelease(pkg._package, sharedConfig, npmConfig, pkg._location)
  )));
  // this filters out nulls for packages that should not be released
  const releaseInfo = nextReleases.filter(n => n);
  return releaseInfo;
}

module.exports = findNextReleaseInfoForAk;
