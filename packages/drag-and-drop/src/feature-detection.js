// @flow

// Firefox handles `position:absolute` differently within a scroll container
// then all the other browsers.
// https://twitter.com/alexandereardon/status/887801019584831489
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;

// eslint-disable-next-line import/prefer-default-export
export const isContainerScrollIgnored = !isFirefox;
