const SVGO = require('svgo');

const preventFocusing = require('./plugins/preventFocusing');
const addRoleAttribute = require('./plugins/addRoleAttribute');
const callbackOnDefinedFill = require('./plugins/callbackOnDefinedFill');
const callbackOnStyleElement = require('./plugins/callbackOnStyleElement');

module.exports = () => {
  const initialiseCustomSVGO = (filename) => {
    const callbackOnDefinedFillPlugin = Object.assign({}, callbackOnDefinedFill, {
      params: Object.assign({}, callbackOnDefinedFill.params, {
        callback: fill => console.warn(`"${filename}": has a fill of "${fill}"`),
      }),
    });

    return new SVGO({
      full: true,
      plugins: [
        { preventFocusing },
        { addRoleAttribute },
        { cleanupIDs: {
          // This is used to prefix IDs of LinearGradient fills with a unique ID in case multiple
          // icons with gradients (company/product icons) are shown on the same page.
          prefix: filename.replace('.svg', '').replace(/[^a-z]+/, '') + '-', // eslint-disable-line
          minify: true,
          remove: true,
        } },
        { callbackOnDefinedFillPlugin },
        { callbackOnStyleElement },
        { removeStyleElement: true },
      ],
    });
  };

  return (filename, data) => {
    const customSVGO = initialiseCustomSVGO(filename);
    // Run the default optimiser on the SVG
    return new Promise(resolve => customSVGO.optimize(data, resolve));
  };
};
