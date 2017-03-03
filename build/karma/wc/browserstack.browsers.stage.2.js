const browserStackBrowsers = {
  // One with native WC support
  chrome_latest_osx: {
    browser: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
  },
  // iOS
  iphone: {
    os: 'ios',
    os_version: '9.1',
    device: 'iPhone 6S',
  },

  // Android
  /* disabled temporarily on 2016-07-19
  android: {
    os: 'android',
    os_version: '4.4',
    device: 'Samsung Galaxy S5',
  },
  */
};

module.exports = browserStackBrowsers;
