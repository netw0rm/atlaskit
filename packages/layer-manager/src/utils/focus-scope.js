/*
  Fork of a11y-focus-scope
  https://github.com/cloudflare/a11y-focus-scope

  Copyright (c) 2015, CloudFlare, Inc.
  All rights reserved.
*/

const tabbable = require('tabbable');
const focusin = require('focusin');

let polyfilled = false;

function init(element, findTabbable) {
  // lazily polyfill focusin for firefox
  if (!polyfilled) {
    focusin.polyfill();
    polyfilled = true;
  }

  function focus() {
    const els = tabbable(element);
    const focusTarget = findTabbable ? els[0] : element;
    focusTarget.focus();
  }

  function onFocusIn(event) {
    if (element !== event.target && !element.contains(event.target)) {
      focus();
    }
  }

  function onKeyDown(event) {
    const els = tabbable(element);
    const last = els[els.length - 1];

    if (element !== event.target && event.target === last && event.key === 'Tab') {
      event.preventDefault();
      focus();
    }
  }

  focus();

  document.addEventListener('focusin', onFocusIn);
  document.addEventListener('keydown', onKeyDown);

  return function teardown() {
    document.removeEventListener('focusin', onFocusIn);
    document.removeEventListener('keydown', onKeyDown);
  };
}

let teardownFn;

exports.scopeFocus = function scopeFocus(element, findTabbable) {
  if (teardownFn) teardownFn();
  teardownFn = init(element, findTabbable);
};

exports.unscopeFocus = function unscopeFocus() {
  if (teardownFn) teardownFn();
  teardownFn = null;
};
