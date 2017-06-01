const testsContext = require.context('./', true, /^((?!_).).*\.(ts|tsx|js|jsx)$/);
testsContext.keys().forEach(testsContext);

