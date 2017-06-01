const testsContext = require.context('./', true, /\.(ts|tsx|js|jsx)$/);
testsContext.keys().forEach(testsContext);
