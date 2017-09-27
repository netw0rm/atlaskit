const modifyBabelPreset = require('modify-babel-preset');

module.exports = function atlaskit(context, opts = {}) {
  const modules = opts.modules !== undefined ? opts.modules : true;

  return {
    presets: [
      modifyBabelPreset('es2015', {
        'transform-es2015-classes': { loose: true },
        'transform-es2015-modules-commonjs': modules,
      }),
      'react',
      'stage-0',
      'flow',
    ],
    plugins: [
      'transform-runtime',
      'transform-class-properties',
      'react-flow-props-to-prop-types',
      ['transform-react-remove-prop-types', { mode: 'wrap' }],
    ],
  };
};
