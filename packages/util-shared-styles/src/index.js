const req = require.context('!less-vars-loader?camelCase&resolveVariables!./', false, /\.less$/);

export { default as akElevationMixins } from './mixins/elevation';
export { default as akHelperMixins } from './mixins/helpers';
export { default as akTypographyMixins } from './mixins/tyopgraphy';

const intVariableNames = [
  'akGridSizeUnitless',
  'akZIndexNavigation',
  'akZIndexLayer',
  'akZIndexBlanket',
  'akZIndexFlag',
  'akZIndexCard',
  'akZIndexDialog',
  'akZIndexModal',
];

export default req.keys().reduce((prev, file) => {
  const vars = req(file);
  Object.assign(prev, vars);
  Object.keys(vars).forEach((varName) => {
    if (intVariableNames.indexOf(varName) > -1) {
      module.exports[varName] = parseInt(vars[varName], 10);
    } else {
      module.exports[varName] = vars[varName];
    }
  });

  return prev;
}, {});
