/*
  eslint-disable no-empty, global-require, import/no-dynamic-require,
  no-console, no-confusing-arrow, prefer-object-spread/prefer-object-spread
*/

const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');
const babel = require('babel-core');
const createBabylonOptions = require('babylon-options');
const { packageList } = require('./packages');

const getExternalMetadata = require('./getExternalMetadata');
const template = require('./data.template');

const getChangelog = (src) => {
  let changelog;
  try {
    changelog = fs.readFileSync(src, 'utf8').toString();
  } catch (e) {
    const shortPath = src.substr(src.indexOf('atlaskit/'));
    console.log(`WARNING: No changelog found at ${shortPath}`);
    changelog = '';
  }
  const splitToken = `__CHANGELOG_SPLIT_${Date.now()}__`;
  const toReturn = changelog
  ? changelog
    .replace(/## /g, `${splitToken}## `)
    .split(splitToken)
    .map((md) => {
      // This should only allow us to skip the first chunk which is the name, as
      // well as the unreleased section.
      const version = md.match(/\d+\.\d+\.\d+/) ? md.match(/\d+\.\d+\.\d+/)[0] : null;
      if (!version) return null;
      return {
        version,
        md,
      };
    })
    .filter(t => t)
  : [''];
  return toReturn;
};

const parseProps = (src) => {
  const fileContents = fs.readFileSync(src).toString();

  const transformed = babel.transform(fileContents, {
    filename: src,
    babelrc: false,
    parserOpts: createBabylonOptions({
      stage: 0,
      plugins: ['flow', 'jsx'],
    }),
    plugins: [
      require('babel-plugin-react-flow-props-to-prop-types').default,
      require('babel-plugin-transform-flow-strip-types'),
    ],
  }).code;
  return reactDocs.parse(transformed);
};

// Loop through the folders up a level, i.e. atlaskit/packages to build up
// a list of packages that we process and filter. Falsy values are filtered
// out and the final array is sorted by component name.
const packages = fs.readdirSync('..').map((key) => {
  // Everything in here should be a directory, but let's check to be safe
  if (!fs.statSync(path.resolve('..', key)).isDirectory()) return false;
  // Everything should have a package.json, but we try/catch to be safe
  let pkg;
  try {
    pkg = require(path.resolve('..', key, 'package.json'));
  } catch (e) {
    return false;
  }
  // We use the custom "ak:component" key in package.json to describe public
  // AtlastKit packages. If it's not present, ignore this package.
  if (!pkg['ak:component']) return false;
  // The name of the component may be in the "ak:component" section; we default
  // to the directory name if it isn't present
  const pkgName = pkg['ak:component'].name || key;
  const supportsDarkMode = pkg['ak:component'].dark;

  // Some packages have docs, so we test for the presence of a directory and
  // pass `true` if it exists. This writes a literal require() into the template
  let docs;
  let nestedDocs;
  let props;
  let changelog;
  try {
    const docsFile = path.resolve(__dirname, '../../', key, 'docs', 'index.js');
    const componentsDir = path.resolve(__dirname, '../../', key, 'docs', 'components');
    const sourcesFile = path.resolve(__dirname, '../../', key, 'docs', 'components.js');
    const changelogFile = path.resolve(__dirname, '../../', key, 'docs', 'CHANGELOG.md');
    changelog = getChangelog(changelogFile);
    docs = fs.statSync(docsFile).isFile();
    // We find out if we have a components directory, which determines whether
    // all exports are intended to be documented on a single page. Note, only
    // Navigation is using this atm, and this fundamentally changes how the
    // information should be displayed.
    try {
      nestedDocs = fs.statSync(componentsDir).isDirectory();
    } catch (e) {}
    props = require(sourcesFile).map(({ name, src }) => ({ name, props: parseProps(src) }));
  } catch (e) {
    // If there is no docs/index.js, we assume the documentatino has not been
    // written yet, and do not halt the build. For all other errors, we should
    // throw.
    if (e.code === 'ENOENT' && e.path === path.resolve(__dirname, '../../', key, 'docs', 'index.js')) {
      console.error(`WARNING: No documentation found for ${pkg.name}.`);
      return {
        key,
        pkg,
        name: pkgName,
      };
    }
    e.message += ` (in ${pkg.name})`;
    throw e;
  }
  // Return the component data
  return {
    changelog,
    docs,
    key,
    name: pkgName,
    supportsDarkMode,
    nestedDocs,
    pkg,
    props,
  };
}).filter(i => i);

const populateMovedPkgs = () => {
  const stillHerePkgs = packages.reduce((obj, pkg) => {
    obj[pkg.pkg.name] = true;
    return obj;
  }, {});
  packageList.forEach((pkg) => {
    if (!stillHerePkgs[pkg.pkg.name]) {
      packages.push(Object.assign({}, pkg, { packageHasBeenMoved: true }));
    }
  });
};

populateMovedPkgs();
const sortedPackages = packages.sort((a, b) => a.name > b.name ? 1 : -1);

const mergeMetadata = component => getExternalMetadata(component.pkg.name)
  .then(metadata => Object.assign({}, component, metadata));

Promise.all(sortedPackages.map(mergeMetadata))
  .then(data => template({ components: data }).replace(/\n\s+\n/g, '\n'))
  .then(data => fs.writeFileSync(path.resolve('src', 'data.js'), data, 'utf8'))
  .then(() => console.info(`📦  => Wrote data.js for ${packages.length} Atlaskit components`))
  .catch(console.error);

// We're done!
