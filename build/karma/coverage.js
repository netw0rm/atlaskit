function setupCoverage(config) {
  config.set({
    reporters: ['progress', 'coverage', 'remap-coverage'],
    // save interim raw coverage report in memory
    coverageReporter: {
      type: 'in-memory',
    },
    remapCoverageReporter: {
      'text-summary': null, // to show summary in console
      html: './coverage/html',
      cobertura: './coverage/cobertura.xml',
    },
  });
}
module.exports = setupCoverage;
