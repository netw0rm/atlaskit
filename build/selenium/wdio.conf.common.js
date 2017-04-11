exports.config = {
  sync: false,
  logLevel: 'silent',
  coloredLogs: true,
  bail: 0,
  maxInstances: 5,
  waitforTimeout: 5000,
  connectionRetryTimeout: 20000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    compilers: ['ts:ts-node/register'],
  },
};
