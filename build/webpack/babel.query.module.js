module.exports = {
  presets: [
    'es2015',
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
