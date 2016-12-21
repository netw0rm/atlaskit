// Collect test files that don't start with an underscore.
const testsContext = require.context(process.env.TEST_DIRECTORY, true, /^([^/]+\/)*[^_]\w*\.(js|ts|tsx)$/);
testsContext.keys().forEach((path) => {
  try {
    testsContext(path);
  } catch (err) {
    // eslint-disable-next-line
    console.error('[ERROR] WITH SPEC FILE: ', path);
    // eslint-disable-next-line
    console.error(err);
  }
});
