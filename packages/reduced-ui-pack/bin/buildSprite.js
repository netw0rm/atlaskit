const fs = require('fs');
const path = require('path');
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const SVGSpriter = require('svg-sprite'); // eslint-disable-line import/no-extraneous-dependencies
const mkdirp = require('mkdirp'); // eslint-disable-line import/no-extraneous-dependencies

const spriter = new SVGSpriter({
  dest: './src',
  // this generates the id attr for each svg in the sprite
  shape: { id: { generator: (name, file) => {
    const iconName = file.path.replace('../icon/src/icons/', '').replace('.svg', '');
    return `ak-icon-${iconName}`;
  } } },
  // this puts an inline style on the sprite to prevent it from being displayed on the page
  mode: { symbol: { inline: true } },
});

// Add SVG source files from 'ak-icon'
const svgFiles = glob.sync('../icon/src/icons/**/*.svg', {});

svgFiles.forEach((svgFile) => {
  spriter.add(svgFile, path.basename(svgFile), fs.readFileSync(svgFile, { encoding: 'utf-8' }));
});

// Compile the sprite
spriter.compile((error, result) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }

  const { path: spritePath, contents } = result.symbol.sprite;
  mkdirp.sync(path.dirname(spritePath));
  fs.writeFileSync(spritePath, contents);
});
