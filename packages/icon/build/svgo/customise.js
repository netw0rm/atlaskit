const SVGO = require('svgo');

const preventFocusing = require('./plugins/preventFocusing');
const addPresentationAttribute = require('./plugins/addPresentationAttribute');
const callbackOnDefinedFill = require('./plugins/callbackOnDefinedFill');
const callbackOnStyleElement = require('./plugins/callbackOnStyleElement');
const addAriaLabels = require('./plugins/addAriaLabels');
const convertAttributesToCamelcase = require('./plugins/convertAttributesToCamelcase');

module.exports = () => {
  const initialiseCustomSVGO = (filename) => {
    const addAriaLabelsPlugin = Object.assign({}, addAriaLabels, {
      params: { title: '{title}' },
    });

    const callbackOnDefinedFillPlugin = Object.assign({}, callbackOnDefinedFill, {
      params: Object.assign({}, callbackOnDefinedFill.params, {
        callback: fill => console.warn(`"${filename}": has a fill of "${fill}"`),
      }),
    });

    return new SVGO({
      full: true,
      plugins: [
        { preventFocusing },
        { convertAttributesToCamelcase },
        { addAttributesToSVGElement: { attributes: ['style="width: 100%; height: 100%;"'] } },
        { addPresentationAttribute },
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
        { addAriaLabelsPlugin },
      ],
    });
  };

  return (filename, data) => {
    const customSVGO = initialiseCustomSVGO(filename);
    // Run the default optimiser on the SVG
    return new Promise(resolve => customSVGO.optimize(data, resolve));
  };
};
