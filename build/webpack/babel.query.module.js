module.exports = {
  babelrc: false,
  presets: [
    'es2015',
    'react',
    'stage-0',
  ],
  plugins: [
    'transform-runtime',
    ['incremental-dom', {
      components: true,
      hoist: true,
      prefix: 'vdom',
    }],
  ],
};
