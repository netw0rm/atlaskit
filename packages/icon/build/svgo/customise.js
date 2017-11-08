const SVGO = require('svgo');

const preventFocusing = require('./plugins/preventFocusing');
const addPresentationAttribute = require('./plugins/addPresentationAttribute');
const callbackOnDefinedFill = require('./plugins/callbackOnDefinedFill');
const callbackOnStyleElement = require('./plugins/callbackOnStyleElement');
const addAriaLabels = require('./plugins/addAriaLabels');
const convertAttributesToCamelcase = require('./plugins/convertAttributesToCamelcase');
const replaceIDs = require('./plugins/replaceIDs');

module.exports = () => {
  const replaceIDPlaceholderStr = 'idPlaceholder';
  const dynamicIDVarName = 'id';
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
        { replaceIDs },
        { callbackOnDefinedFillPlugin },
        { callbackOnStyleElement },
        { removeStyleElement: true },
        { addAriaLabelsPlugin },
      ],
    });
  };

  // Replace the ID placeholders in the replaceID step with the dynamic variable name
  const replaceIDPlaceholders = (svgData) => {
    const linearRegex = new RegExp(`id=\\"([^"]+)-${replaceIDPlaceholderStr}\\"`, 'g');
    const urlRegex = new RegExp(`fill=\\"url\\(#([^"]+)-${replaceIDPlaceholderStr}\\)\\"`, 'g');

    const replacedData = svgData.data
      .replace(linearRegex, `id={"$1-" + ${dynamicIDVarName}}`)
      .replace(urlRegex, `fill={"url(#$1-" + ${dynamicIDVarName} + ")"}`);

    return Object.assign({}, svgData, { data: replacedData });
  };

  return (filename, data) => {
    const customSVGO = initialiseCustomSVGO(filename);

    // Run the default optimiser on the SVG
    return new Promise(resolve => customSVGO.optimize(data, resolve))
      .then((svgData) => replaceIDPlaceholders(svgData));
  };
};
