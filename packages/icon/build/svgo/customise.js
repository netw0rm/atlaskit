const SVGO = require('svgo');

const preventFocusing = require('./plugins/preventFocusing');
const addPresentationAttribute = require('./plugins/addPresentationAttribute');
const callbackOnDefinedFill = require('./plugins/callbackOnDefinedFill');
const callbackOnStyleElement = require('./plugins/callbackOnStyleElement');
const addAriaLabels = require('./plugins/addAriaLabels');
const convertAttributesToCamelcase = require('./plugins/convertAttributesToCamelcase');

module.exports = (config) => {
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
        { addAttributesToSVGElement: { attributes: ['{...svgProps}'] } },
        { addPresentationAttribute },
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
