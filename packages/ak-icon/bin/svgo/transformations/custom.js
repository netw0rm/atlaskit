const SVGO = require('svgo');
const addPresentationAttribute = require('../plugins/addPresentationAttribute');
const callbackOnDefinedFill = require('../plugins/callbackOnDefinedFill');
const addAriaLabel = require('../plugins/addAriaLabel');

const addAriaLabelPlugin = Object.assign({}, addAriaLabel, {
  params: {
    title: '{title}',
    description: '{description}',
  },
});

/**
* Runs custom transformations on an SVG
*
* @param {Function} fillCallback A callback that gets invoked if a defined fill color has been found
* @return {SVGO} an SVGO instance
*/
module.exports = (fillCallback) => {
  const callbackOnDefinedFillPlugin = Object.assign({}, callbackOnDefinedFill, {
    params: Object.assign({}, callbackOnDefinedFill.params, {
      callback: fillCallback,
    }),
  });

  const svgo = new SVGO({
    full: true,
    plugins: [
      {
        addAttributesToSVGElement: {
          attributes: ['{...props}'],
        },
      },
      {
        addPresentationAttribute,
      },
      {
        callbackOnDefinedFillPlugin,
      },
      {
        addAriaLabelPlugin,
      },
    ],
  });
  return svgo;
};
