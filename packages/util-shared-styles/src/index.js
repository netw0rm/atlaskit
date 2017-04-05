const req = require.context('!less-vars-loader?camelCase&resolveVariables!./', false, /\.less$/);

export { default as akElevationMixins } from './mixins/elevation';
export { default as akTypographyMixins } from './mixins/tyopgraphy';

export default req.keys().reduce((prev, file) => {
  const vars = req(file);
  Object.assign(prev, vars);
  Object.keys(vars).forEach((varName) => {
    module.exports[varName] = vars[varName];
  });

  return prev;
}, {});
