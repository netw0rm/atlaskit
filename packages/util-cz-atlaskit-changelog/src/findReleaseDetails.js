const { default: io } = require('lerna-semantic-release-io');
const srRegistry = require('semantic-release/src/lib/get-registry');
const npmconf = require('npmconf');

const getNextRelease = (pkg, sharedConfig, npmConfig) => {
  // eslint-disable-next-line
  const config = Object.assign({}, sharedConfig, {
    options: {
      branch: (pkg.release && pkg.release.branch) || 'master',
    },
  }, { pkg });
  // eslint-disable-next-line
  config.npm = Object.assign(
    {},
    config.npm,
    {
      registry: srRegistry(pkg, npmConfig),
      tag: (pkg.publishConfig || {}).tag || npmConfig.get('tag') || 'latest',
    }
  );
  return new Promise((res, rej) => {
    io.semanticRelease.pre(config, (err, nextRelease) => (err ? rej(err) : res(nextRelease)));
  }).catch((e) => {
    if (e.code === 'ENOCHANGE') return null;
    if (e.code === 'ENOTINHISTORY') console.log('pkg', pkg);
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
    getNextRelease(pkg._package, sharedConfig, npmConfig))
  ));
  console.log('Have awaited next release');
  const moreNext = nextReleases.filter(n => n);
  console.log('FILTERED');
  console.log('========================================');
  console.log('========================================');
  console.log('========================================');
  console.log('========================================');
  console.log('IN THE END', moreNext);
}
try {
  findNextReleaseInfoForAk();
} catch (e) {
  console.log(e);
}

// module.exports = findNextReleaseInfoForAk;
