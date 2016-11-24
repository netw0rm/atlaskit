const SVGO = require('svgo');

const addPresentationAttribute = require('../plugins/addPresentationAttribute');
const callbackOnDefinedFill = require('../plugins/callbackOnDefinedFill');
const callbackOnStyleElement = require('../plugins/callbackOnStyleElement');
const addAriaLabels = require('../plugins/addAriaLabels');
const convertAttributesToCamelcase = require('../plugins/convertAttributesToCamelcase');


const addAriaLabelsPlugin = Object.assign({}, addAriaLabels, {
  params: {
    title: '{title}',
  },
});

/**
* Runs custom transformations on an SVG
*
* @param {Function} fillCallback A callback that gets invoked if a defined fill color has been found
* @return {SVGO} an SVGO instance
*/
module.exports = (fillCallback, styleCallback) => {
  const callbackOnDefinedFillPlugin = Object.assign({}, callbackOnDefinedFill, {
    params: Object.assign({}, callbackOnDefinedFill.params, {
      callback: fillCallback,
    }),
  });
  const callbackOnStyleElementPlugin = Object.assign({}, callbackOnStyleElement, {
    params: Object.assign({}, callbackOnStyleElement.params, {
      callback: styleCallback,
    }),
  });

  const svgo = new SVGO({
    full: true,
    plugins: [
      { convertAttributesToCamelcase },
      { addAttributesToSVGElement: {
        attributes: ['{...iconProps}'],
      } },
      { addPresentationAttribute },
      { callbackOnDefinedFillPlugin },
      { callbackOnStyleElementPlugin },
      { removeStyleElement: true },
      { addAriaLabelsPlugin },
    ],
  });
  return svgo;
};
