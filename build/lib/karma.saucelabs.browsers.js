const sauceBrowsers = {
  // Chrome
  chrome_latest_linux: {
    browserName: 'chrome',
    platform: 'Linux',
    version: 'latest',
  },
  chrome_latest_windows: {
    browserName: 'chrome',
    platform: 'Windows 10',
    version: 'latest',
  },
  chrome_latest_osx: {
    browserName: 'chrome',
    platform: 'OS X 10.11',
    version: 'latest',
  },
  // Firefox
  firefox_latest_linux: {
    browserName: 'firefox',
    platform: 'Linux',
    version: 'latest',
  },
  firefox_latest_windows: {
    browserName: 'firefox',
    platform: 'Windows 10',
    version: 'latest',
  },
  firefox_latest_osx: {
    browserName: 'firefox',
    platform: 'OS X 10.11',
    version: 'latest',
  },
  // Safari
  safari_latest: {
    browserName: 'safari',
    version: '9.0',
    platform: 'OS X 10.11',
  },
  // IE
  internet_explorer_10: {
    browserName: 'internet explorer',
    version: '10',
    platform: 'Windows 8',
  },
  internet_explorer_11: {
    browserName: 'internet explorer',
    version: '11',
    platform: 'Windows 8.1',
  },
  // Edge
  microsoftedge_latest: {
    browserName: 'microsoftedge',
    platform: 'Windows 10',
    version: 'latest',
  },
  // iOS
  iphone: {
    browserName: 'iphone',
    platform: 'OS X 10.10',
    version: 'latest',
    deviceName: 'iPhone Simulator',
  },
  // Android
  android: {
    browserName: 'android',
    platform: 'Linux',
    version: '4.0',
    deviceName: 'Android Emulator',
    deviceType: 'phone',
    deviceOrientation: 'portrait',
  },
};

// This is the same for every browser.
Object.keys(sauceBrowsers).forEach((key) => {
  sauceBrowsers[key].base = 'SauceLabs';
});

module.exports = sauceBrowsers;
