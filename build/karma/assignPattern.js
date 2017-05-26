module.exports = (config, pattern, excludePattern) => {
  config.set({
    files: [pattern],
    preprocessors: {
      [pattern]: ['webpack'],
    },
  });
  if (excludePattern) {
    config.set({
      exclude: [excludePattern],
    });
  }
};
