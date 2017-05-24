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

const tsconfigUmd = {
  extends: '../../build/types/tsconfig.base',
  compilerOptions: {
    declaration: true,
    outDir: './types',
    lib: ['dom', 'es6'],
    target: 'es5',
  },
  include: [
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
};

fs.readdirSync(pathPackages).forEach((pathPackage) => {
  const dir = path.join(pathPackages, pathPackage);

  const nwbFile = path.join(dir, 'nwb.config.js');
  const tsFile = path.join(dir, 'tsconfig.json');
  const tsUmdFile = path.join(dir, 'tsconfig.umd.json');
  const unitFile = path.join(dir, 'test', 'unit');
  const testFile = path.join(dir, 'test');
  const testsFile = path.join(dir, 'tests');
  const storybookDir = path.join(dir, 'stories');

  const isTsPackage = fs.existsSync(tsFile);
  const isMochaPackage = fs.existsSync(unitFile);
  const isTestedPackage = fs.existsSync(testFile) || fs.existsSync(testsFile);
  const isStorybookPackage = fs.existsSync(storybookDir);

  if (!fs.statSync(dir).isDirectory()) {
    return;
  }

  if (isTsPackage) {
    fs.writeFileSync(tsUmdFile, JSON.stringify(tsconfigUmd, null, 2));
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
    test: getTestCommand(),
    'test:watch': getTestCommand({ watch: true }),
  };

  if (isStorybookPackage) {
    pkgJson.scripts.storybook = `${binPath}/start-storybook -c ../../build/storybook-nwb -p 9001`;
  } else if (pkgJson.scripts.storybook) {
    delete pkgJson.scripts.storybook;
  }

  if (isTsPackage) {
    pkgJson.types = 'umd/types/index.d.ts';
  }

  // Remove old fields.
  delete pkgJson.module;
  delete pkgJson.webpack;
  delete pkgJson['ak:webpack:raw'];
  delete pkgJson['jsnext:main'];

  fs.writeFileSync(pkg, JSON.stringify(pkgJson, null, 2));
  fs.writeFileSync(nwbFile, 'module.exports = require(\'../../nwb.config\');\n');

  // TODO rename all jsx files to js
});
