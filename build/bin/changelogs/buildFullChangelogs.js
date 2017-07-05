/* eslint-disable no-underscore-dangle, no-console */
const { default: io } = require('lerna-semantic-release-io');
const buildFullChangelog = require('./buildFullChangelog');

const pkgs = io.lerna.getAllPackages().map(pkg => ({
  location: pkg._location,
  name: pkg._package.name,
}));

Promise.all(pkgs.map(details => (
  buildFullChangelog(details).then(
    d => console.log(`${details.name} changelog built, ${d}`),
    e => ({ error: e, package: details.name })
  )
))).then(stuff => console.log('built all changelogs. Errors:', stuff.filter(s => s)));
