module.exports = function atlaskit(context, opts = {}) {
  const modules = opts.modules !== undefined ? opts.modules : 'commonjs';

  return {
    presets: [
      ['es2015', { modules }],
      'react',
      'stage-0',
      'flow',
    ],
    plugins: [
      'transform-runtime',
      'transform-class-properties',
      'react-flow-props-to-prop-types',
    ],
  };
};
