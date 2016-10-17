const browserStackBrowsers = {
  // One old one
  internet_explorer_11: {
    browser: 'ie',
    os: 'WINDOWS',
    os_version: '8.1',
    browser_version: '11',
  },

  // One with native WC support
  chrome_beta_osx: {
    browserName: 'Chrome',
    browser_version: '54.0 beta',
    os: 'OS X',
    os_version: 'El Capitan',
  },
  
  chrome_latest_osx: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
  },
};

module.exports = browserStackBrowsers;
