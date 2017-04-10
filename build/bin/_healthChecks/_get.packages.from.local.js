const path = require('path');
const fs = require('fs');

// returns an array of all the package.json's from each of the packages
function getAllPackageJsons() {
  const packagesDir = path.join('./packages');
  const packages = fs.readdirSync(packagesDir)
    .filter(file => fs.statSync(path.join(packagesDir, file)).isDirectory());
  const packageJsons = [];
  packages.forEach((pkg) => {
    const packageJson = JSON.parse(fs.readFileSync(path.join(packagesDir, pkg, 'package.json')));
    packageJsons.push(packageJson);
  });
  return packageJsons;
}
module.exports = getAllPackageJsons;
