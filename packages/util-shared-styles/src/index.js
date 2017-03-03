const req = require.context('!less-vars-loader?camelCase&resolveVariables!./', false, /\.less$/);

export default req.keys().reduce((prev, file) => {
  const vars = req(file);
  Object.assign(prev, vars);
  Object.keys(vars).forEach((varName) => {
    module.exports[varName] = vars[varName];
  });

  return prev;
}, {});

export {
  akTypographyH100,
  akTypographyH200,
  akTypographyH300,
  akTypographyH400,
  akTypographyH500,
  akTypographyH600,
  akTypographyH700,
  akTypographyH800,
  akTypographyH900,
} from './headings';
