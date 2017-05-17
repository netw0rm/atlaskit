const browserStackBrowsers = {
  // Chrome
  chrome_latest_windows: {
    browser: 'chrome',
    os: 'WINDOWS',
    os_version: '10',
  },

  // Firefox
  firefox_latest_windows: {
    browser: 'firefox',
    os: 'WINDOWS',
    os_version: '10',
  },
  firefox_latest_osx: {
    browser: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
  },

  // We don't support El Capitan, and Browserstack does not support macOS Sierra that has Safari 10.
  // // Safari
  // safari_latest: {
  //   browser: 'safari',
  //   os: 'OS X',
  //   os_version: 'El Capitan',
  // },

  // Edge
  edge_latest: {
    browser: 'edge',
    os: 'WINDOWS',
    os_version: '10',
  },
};

module.exports = browserStackBrowsers;
