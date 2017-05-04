/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const pathPackages = path.join(cwd, 'packages');
const modPath = '../../node_modules';
const binPath = `${modPath}/.bin`;
const exclude = [
  'css-reset',
  'icon',
  'reduced-ui-pack',
  'util-cz-',
  'util-dmd-',

  // temporarily disabled
  'dropdown-menu',
  'droplist',
  'editor-core',
  'field-base',
  'field-text',
  'flag',
  'icon',
  'inline-edit',
  'media-avatar-picker',
  'media-card',
  'media-editor',
  'media-filmstrip',
  'mention',
  'multi-select',
  'profilecard',
];

fs.readdirSync(pathPackages).forEach((pathPackage) => {
  const dir = path.join(pathPackages, pathPackage);

  const nwbFile = path.join(dir, 'nwb.config.js');
  const tsFile = path.join(dir, 'tsconfig.json');
  const unitFile = path.join(dir, 'test', 'unit');
  const testFile = path.join(dir, 'test');
  const testsFile = path.join(dir, 'tests');

  const isTsPackage = fs.existsSync(tsFile);
  const isMochaPackage = fs.existsSync(unitFile);
  const isTestedPackage = fs.existsSync(testFile) || fs.existsSync(testsFile);

  if (!fs.statSync(dir).isDirectory()) {
    return;
  }

  // Special packages.
  if (exclude.indexOf(pathPackage) > -1) {
    return;
  }

  // Remove so we can re-add.
  if (fs.existsSync(nwbFile)) {
    fs.unlinkSync(nwbFile);
  }

  const pkg = path.join(dir, 'package.json');

  if (!fs.existsSync(pkg)) {
    return;
  }

  const pkgJson = require(pkg);

  if (!pkgJson.scripts || !pkgJson.scripts.prepublish) {
    return;
  }

  function getTestCommand({ watch } = {}) {
    if (!isTestedPackage) {
      return "echo 'Error: no test specified'";
    }
    return isMochaPackage
      ? `mocha${watch ? ' --watch' : ''} --colors --require ../../test-setup './test/unit/**/*.js' --timeout 10000`
      : `${binPath}/nwb test${watch ? ' --server' : ''}`;
  }

  pkgJson.files = ['umd'];
  pkgJson.main = `umd/${pkgJson.name}.js`;
  pkgJson.scripts = {
    lint: isTsPackage
      ? `${binPath}/tslint --project . '*.{ts,tsx,d.ts}' '{src,stories}/**/*.{ts,tsx,d.ts}'`
      : `${binPath}/eslint --color --format "${modPath}/eslint-friendly-formatter" --ext .js --ext .jsx src/ stories/ test/`,
    prepublish: `${binPath}/nwb build`,
    storybook: `${binPath}/start-storybook -c ../../build/storybook-nwb -p 9001`,
    test: getTestCommand(),
    'test:watch': getTestCommand({ watch: true }),
  };

  // Remove old fields.
  delete pkgJson.module;
  delete pkgJson.webpack;
  delete pkgJson['ak:webpack:raw'];

  fs.writeFileSync(pkg, JSON.stringify(pkgJson, null, 2));
  fs.writeFileSync(nwbFile, 'module.exports = require(\'../../nwb.config\');\n');

  // TODO rename all jsx files to js
});
