// Collect test files that don't start with an underscore.
const testsContext = require.context(process.env.TEST_DIRECTORY, true, /^([^/]+\/)*[^_]\w*\.(js|jsx|ts|tsx)$/);
testsContext.keys().forEach((path) => {
  try {
    testsContext(path);
  } catch (err) {
    console.error(`Running tests in: ${path}`);
    throw err;
  }
});
