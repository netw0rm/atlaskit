/* eslint import/no-dynamic-require: 0 */
/* eslint global-require: 0 */

const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const pathPackages = path.join(cwd, 'packages');

const exclude = ['icon', 'reduced-ui-pack'];

fs.readdirSync(pathPackages).forEach((pathPackage) => {
  const dir = path.join(pathPackages, pathPackage);
  const nwbFile = path.join(dir, 'nwb.config.js');
  const tsFile = path.join(dir, 'tsconfig.js');

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

  // TypeScript packages.
  if (fs.existsSync(tsFile)) {
    return;
  }

  const pkg = path.join(dir, 'package.json');
  const pkgJson = require(pkg);

  if (!pkgJson.scripts || !pkgJson.scripts.prepublish) {
    return;
  }

  pkgJson.files = ['es', 'lib', 'umd'];
  pkgJson.main = 'lib/index.js';
  pkgJson.module = 'es/index.js';
  pkgJson.scripts.prepublish = 'nwb build-web-module';
  pkgJson.scripts.test = 'nwb test';

  fs.renameSync(path.join(dir, 'test'), path.join(dir, 'tests'));
  fs.writeFileSync(pkg, JSON.stringify(pkgJson, null, 2));
  fs.writeFileSync(nwbFile, 'module.exports = require(\'../../nwb.config\');\n');

  // TODO rename all jsx files to js
});
