const fs = require('fs');
const glob = require('glob');
const karmaConf = require('./base.js');

const base = 'packages/*/test';
const files = `${base}/**/!(_)*.+(js|ts)`;
const tmp = 'browserstack-entry.js';

module.exports = (config) => {
  const content = glob
    .sync(files, {
      cwd: process.cwd(),
      realpath: true,
    })
    .map((jsFile) => `import '${jsFile}';`)
    .join('\n');

  fs.writeFileSync(tmp, content);

  Object.assign(config, {
    files: [tmp],
    preprocessors: {
      [tmp]: ['webpack', 'sourcemap'],
    },
  });
  karmaConf(config);
};
