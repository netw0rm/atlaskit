/* eslint-disable no-console */
const { default: io } = require('lerna-semantic-release-io');
const srRegistry = require('semantic-release/src/lib/get-registry');
const npmconf = require('npmconf');
const analyzeCommits = require('./analyzeCommits');
const updateChangelog = require('./updateChangelog');

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
    if (e.code === 'ENOCHANGE' || e.code === 'ENOTINHISTORY') return null;
    console.log('ERROR ERROR ERROR', e);
    throw e;
  });
};

function findNextReleaseInfoForAk() {
  const npmConfPromise = new Promise((resolve) => {
    npmconf.load({}, (err, config) => (
      resolve(config)
    ));
  });

  return npmConfPromise.then((npmConfig) => {
    const plugins = io.semanticRelease.plugins;
    plugins.analyzeCommits = analyzeCommits;

    const sharedConfig = {
      env: process.env,
      plugins,
      npm: {
        auth: {
          token: process.env.NPM_TOKEN,
        },
        loglevel: npmConfig.get('loglevel'),
      },
    };
    const packages = io.lerna.getAllPackages();
    return Promise.all(packages.map(pkg => (
      // eslint-disable-next-line
      getNextRelease(pkg._package, sharedConfig, npmConfig, pkg._location)
    )));
  }).then((nextReleases) => {
    // this filters out nulls for packages that should not be released
    const releaseInfo = nextReleases.filter(n => n);
    return releaseInfo;
  });
}
findNextReleaseInfoForAk()
  .then(releaseInfo => releaseInfo.filter(info => info.nextRelease.type.type))
  // .then(releaseInfo => releaseInfo.filter(info => info.nextRelease.type.type
  // || info.nextRelease.type === 'initial'))
  // .then(releaseInfo => releaseInfo.map(info => info.nextRelease.type))
  .then(releases => releases.map(updateChangelog))
  .then(whatever => console.log(whatever));

module.exports = findNextReleaseInfoForAk;
