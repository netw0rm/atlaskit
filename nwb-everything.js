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
  'reduced-ui-pack',
  'util-cz-',
  'util-dmd-',
];

fs.readdirSync(pathPackages).forEach((pathPackage) => {
  const dir = path.join(pathPackages, pathPackage);
  const nwbFile = path.join(dir, 'nwb.config.js');
  const tsFile = path.join(dir, 'tsconfig.json');
  const isTsPackage = fs.existsSync(tsFile);

  if (!fs.statSync(dir).isDirectory()) {
    return;
  }

  if (fs.existsSync(nwbFile)) {
    fs.unlinkSync(nwbFile);
  }

  // Special packages.
  if (exclude.indexOf(pathPackage) > -1) {
    return;
  }

  const pkg = path.join(dir, 'package.json');

  if (!fs.existsSync(pkg)) {
    return;
  }

  const pkgJson = require(pkg);

  if (!pkgJson.scripts || !pkgJson.scripts.prepublish) {
    return;
  }

  pkgJson.files = ['umd'];
  pkgJson.main = `umd/${pkgJson.name}.js`;
  pkgJson.scripts = {
    lint: isTsPackage
      ? `${binPath}/tslint -c ../../tslint.json "./src/**/*.{ts,tsx,d.ts}" "./stories/**/*.{ts,tsx,d.ts}" "*.{ts,tsx,d.ts}"`
      : `${binPath}/eslint --color --format "${modPath}/eslint-friendly-formatter" --ext .js --ext .jsx src/ stories/ test/`,
    prepublish: `${binPath}/nwb build`,
    storybook: `${binPath}/start-storybook -c ../../build/storybook-nwb -p 9001`,
    test: `${binPath}/nwb test`,
    'test:watch': `${binPath}/nwb test --server`,
  };

  // Remove old fields.
  delete pkgJson.module;
  delete pkgJson.webpack;
  delete pkgJson['ak:webpack:raw'];

  fs.writeFileSync(pkg, JSON.stringify(pkgJson, null, 2));
  fs.writeFileSync(nwbFile, 'module.exports = require(\'../../nwb.config\');\n');

  // TODO rename all jsx files to js
});
