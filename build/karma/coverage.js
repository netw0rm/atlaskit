function setupCoverage(config) {
  config.set({
    reporters: ['progress', 'coverage', 'remap-coverage'],
    remapCoverageReporter: {
      'text-summary': null, // to show summary in console
      html: './coverage/html',
    },
  });
}
module.exports = setupCoverage;
