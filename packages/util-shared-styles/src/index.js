// We disable es-lint below because jsVars wont exist in the repo (it it .gitignore and generated)
const lessVarsAsJS = require('../build/jsVars'); // eslint-disable-line  import/no-unresolved

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

Object.keys(lessVarsAsJS).forEach((varName) => {
  if (intVariableNames.indexOf(varName) > -1) {
    module.exports[varName] = parseInt(lessVarsAsJS[varName], 10);
  } else {
    module.exports[varName] = lessVarsAsJS[varName];
  }
});

// the order is very important here if these requires happen before the computation above
// then the exported consts will interpolate undefined into their variables,
// since the values won't exist on the exports of this module before the requires resolve.
// this is a known issue encompased by AK-3182, and will be removed in that issue.

const { default: akAnimationMixins } = require('./mixins/animation');
const { default: akElevationMixins } = require('./mixins/elevation');
const { default: akHelperMixins } = require('./mixins/helpers');
const { default: akTypographyMixins } = require('./mixins/typography');

module.exports = Object.assign(
  module.exports,
  {
    // this default export only exists for backwards compat
    // and should be removed on the next breaking change.
    // See issue no: AK-3182
    default: lessVarsAsJS,
    akAnimationMixins,
    akElevationMixins,
    akHelperMixins,
    akTypographyMixins,
  }
);
