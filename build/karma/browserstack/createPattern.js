module.exports = packages =>
  `./packages/+(${packages.join('|')})/test/browser/**/!(_)*.@(ts|js|jsx|tsx)`;
