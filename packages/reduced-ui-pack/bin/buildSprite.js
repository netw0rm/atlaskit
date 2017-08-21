const fs = require('fs');
const path = require('path');
const glob = require('glob'); // eslint-disable-line import/no-extraneous-dependencies
const SVGSpriter = require('svg-sprite'); // eslint-disable-line import/no-extraneous-dependencies
const mkdirp = require('mkdirp'); // eslint-disable-line import/no-extraneous-dependencies

const spriterConfig = {
  dest: './dist',
  // this generates the id attr for each svg in the sprite
  shape: {
    id: {
      generator: (name, file) => {
        const iconName = file.path.replace('../icon/icons/processed/', '').replace('.svg', '');
        return `ak-icon-${iconName}`;
      },
    },
  },
  // this puts an inline style on the sprite to prevent it from being displayed on the page
  mode: {
    symbol: {
      dest: '.',
      inline: true,
      sprite: 'icons-sprite.svg',
    },
  },
};

const spriter = new SVGSpriter(spriterConfig);

// Add SVG source files from 'ak-icon'
glob.sync('../icon/icons/processed/**/*.svg', {}).forEach((svgFile) => {
  const svgContents = fs.readFileSync(svgFile, { encoding: 'utf-8' });
  spriter.add(svgFile, path.basename(svgFile), svgContents);
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
