#! /usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
/*
  This script was added as a part of AK-3251 to fix one of the intermittent issues when building
   the website.
  For some reason, occasionally hpack.js installs with no main field in its package.json, so we
   just add it ourself.
  We dont know if a user has installed this package using npm/yarn in the package, or if it uses
   bootstrap from the root, so we have to check a couple of locations (and we'll fix any that we
   find)
*/

const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
// hpack package.json path if it has been flattened (when yarn installing for example)
const hpackFlatInstallPath = path.join(nodeModulesPath, 'hpack.js', 'package.json');
// hpack package.json path if it is installed 'global-style' (i.e, when bootstrapped from root)
const hpackGlobalStylePath = path.join(nodeModulesPath, 'webpack-dev-server', 'node_modules', 'hpack.js', 'package.json');

function fixHpackMainFile(filePath) {
  const pkgJson = require(filePath); // eslint-disable-line  import/no-dynamic-require, global-require, max-len
  if (!pkgJson.main) {
    pkgJson.main = 'lib/hpack.js';
    fs.writeFileSync(filePath, JSON.stringify(pkgJson, null, 2));
    console.log(`Found broken hpack.json main field ${chalk.green('Fixed!')}`);
  }
}

if (fs.existsSync(hpackFlatInstallPath)) {
  fixHpackMainFile(hpackFlatInstallPath);
}

if (fs.existsSync(hpackGlobalStylePath)) {
  fixHpackMainFile(hpackGlobalStylePath);
}

