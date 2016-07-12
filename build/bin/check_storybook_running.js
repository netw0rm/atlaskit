const http = require('http');

function CheckStorybookRunning(logger) {
  return new Promise(resolve => {
    http.get({
      hostname: '127.0.0.1',
      port: 9001,
      path: '/',
    }, () => {
      resolve();
    }).on('error', () => {
      logger.error('Please ensure Storybook is running on port 9001 with `npm run storybook`');
      process.exit(1);
    });
  });
}

module.exports = CheckStorybookRunning;
