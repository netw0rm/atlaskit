const browserStackBrowsers = {
  // Chrome
  chrome_latest_windows: {
    browser: 'chrome',
    os: 'WINDOWS',
    os_version: '10',
  },
  chrome_latest_osx: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
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

  // Safari
  safari_latest: {
    browser: 'safari',
    os: 'OS X',
    os_version: 'El Capitan',
  },

  // IE
  internet_explorer_11: {
    browser: 'ie',
    os: 'WINDOWS',
    os_version: '8.1',
    browser_version: '11',
  },

  // Edge
  edge_latest: {
    browser: 'edge',
    os: 'WINDOWS',
    os_version: '10',
  },

  // iOS
  iphone: {
    os: 'ios',
    os_version: '9.1',
    device: 'iPhone 6S',
  },

  // Android
  android: {
    os: 'android',
    os_version: '4.4',
    device: 'Samsung Galaxy S5',
  },
};

// This is the same for every browser.
Object.keys(browserStackBrowsers).forEach((key) => {
  browserStackBrowsers[key].base = 'BrowserStack';
});

module.exports = browserStackBrowsers;
