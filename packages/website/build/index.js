/*
  eslint-disable no-empty, global-require, import/no-dynamic-require,
  no-console, no-confusing-arrow
*/

const fs = require('fs');
const path = require('path');
const reactDocs = require('react-docgen');

const getExternalMetadata = require('./getExternalMetadata');
const template = require('./data.template');

const parseProps = src => reactDocs.parse(fs.readFileSync(src).toString());

// Loop through the folders up a level, i.e. atlaskit/packages to build up
// a list of components that we process and filter. Falsy values are filtered
// out and the final array is sorted by component name.
const components = fs.readdirSync('..').map((key) => {
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
  // AtlastKit components. If it's not present, ignore this package.
  if (!pkg['ak:component']) return false;
  // Some components have docs, so we test for the presence of a directory and
  // pass `true` if it exists. This writes a literal require() into the template
  let docs;
  let props;
  try {
    const docsFile = path.resolve(__dirname, '../../', key, 'docs', 'index.js');
    const sourcesFile = path.resolve(__dirname, '../../', key, 'docs', 'components.js');
    docs = fs.statSync(docsFile).isFile();
    props = require(sourcesFile).map(({ name, src }) => ({ name, props: parseProps(src) }));
  } catch (e) {}
  // The name of the component may be in the "ak:component" section; we default
  // to the directory name if it isn't present
  const name = pkg['ak:component'].name || key;
  // Return the component data
  return {
    docs,
    props,
    key,
    name,
    pkg,
  };
}).filter(i => i).sort((a, b) => a.name > b.name ? 1 : -1);

/* eslint-disable prefer-object-spread/prefer-object-spread */
const mergeMetadata = component => getExternalMetadata(component.pkg.name)
  .then(metadata => Object.assign({}, component, metadata));
/* eslint-enable prefer-object-spread/prefer-object-spread */

Promise.all(components.map(mergeMetadata))
  .then(data => template({ components: data }).replace(/\n\s+\n/g, '\n'))
  .then(data => fs.writeFileSync(path.resolve('src', 'data.js'), data, 'utf8'))
  .then(() => console.info(`📦  => Wrote data.json for ${components.length} AtlasKit components`))
  .catch(console.error);

// We're done!
