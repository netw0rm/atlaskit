const path = require('path');
const fs = require('fs');

// returns an array of all the package.json's from each of the packages
function getAllPackageJsons() {
  const packagesDir = './packages';
  const packages = fs.readdirSync(packagesDir)
    .filter(file => fs.statSync(path.join(packagesDir, file)).isDirectory())
    .map(pkgName => fs.readFileSync(path.join(packagesDir, pkgName, 'package.json')))
    .map(JSON.parse);
  return packages;
}

module.exports = getAllPackageJsons;
