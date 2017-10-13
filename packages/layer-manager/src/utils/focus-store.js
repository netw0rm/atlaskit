/*
  Fork of a11y-focus-store
  https://github.com/cloudflare/a11y-focus-store

  Copyright (c) 2015, CloudFlare, Inc.
  All rights reserved.
*/

let storedElements = [];

exports.storeFocus = function storeFocus() {
  storedElements.push(document.activeElement);
};

exports.clearStoredFocus = function clearStoredFocus() {
  storedElements = [];
};

exports.restoreFocus = function restoreFocus() {
  if (!storedElements.length) return;

  try {
    const target = storedElements[storedElements.length - 1];
    target.focus();
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(err); // eslint-disable-line no-console
    }
  }

  storedElements.pop();
};
