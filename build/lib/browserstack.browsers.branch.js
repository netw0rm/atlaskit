const browsers = require('./browserstack.browsers.master.js');

delete browsers.chrome_latest_windows;
delete browsers.firefox_latest_windows;

module.exports = browsers;
