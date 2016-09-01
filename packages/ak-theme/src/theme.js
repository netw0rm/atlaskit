import { Component, emit, prop, vdom, define } from 'skatejs';
// import { style } from 'akutil-common';
import themes from './themes';

import jss from '../../akutil-common/node_modules/jss';

const { HTMLContentElement, HTMLSlotElement, ShadowRoot } = window;
const native = fn => (fn || '').toString().indexOf('[native code]') > -1;
const div = document.createElement('div');
const supportsShadowDOM = native(ShadowRoot);
const supportsShadowDOMV0 = div.createShadowRoot && native(HTMLContentElement);
const supportsShadowDOMV1 = div.attachShadow && native(HTMLSlotElement);

// Polyfill :host
// --------------

jss.use(rule => {
  if (rule.name.indexOf(':host') === 0) {
    if (supportsShadowDOM) {
      rule.selectorText = rule.name;
    } else {
      const match = rule.selectorText.match(/:host\((.*)\)/);
      const matchSelector = match && match[1] || '';
      rule.selectorText = rule.options.sheet.options.elem.tagName.toLowerCase() + matchSelector;
    }
  }
});

// Polyfill ::slotted
// ------------------

jss.use(rule => {
  if (rule.name.indexOf('::slotted') > -1) {
    const match = rule.name.match(/(.*)::slotted\((.*)\)/);
    const matchSlot = match && match[1] || '';
    const matchSelector = match && match[2] || '';
    if (supportsShadowDOMV1) {
      rule.selectorText = rule.name;
    } else if (supportsShadowDOMV0) {
      rule.selectorText = `${matchSlot}::content > ${matchSelector}`;
    } else {
      const lcTagName = rule.options.sheet.options.elem.tagName.toLowerCase();
      rule.selectorText = `${lcTagName} slot${matchSlot} > ${matchSelector}`;
    }
  }
});

// eslint-disable-next-line consistent-return
function findHost(e) {
  // eslint-disable-next-line no-cond-assign, no-param-reassign
  while (e = e.parentNode) {
    if (e.shadowRoot) {
      return e;
    }
  }
}

function style(css) {
  let ret;
  function ref(e) {
    const sheet = jss.createStyleSheet(css, { elem: findHost(e) });
    ret = sheet.classes;
    e.textContent = sheet.toString();
  }
  vdom.element('style', { css, ref, skip: true });
  return ret;
}


function varsFromChildren(host) {
  return [].slice.call(host.children).reduce((prev, curr) => {
    const [key, val] = [curr.getAttribute('key'), curr.getAttribute('val')];

    if (key.indexOf('.') > -1) {
      const keys = key.split('.');
      const first = keys.shift();
      const last = keys.pop();
      prev[first] = prev[first] || {};
      let obj = prev[first];
      while (keys.length) {
        const part = keys.shift();
        obj = obj[part] || (obj[part] = {});
      }
      obj[last] = val;
    } else {
      prev[key] = val;
    }

    return prev;
  }, {});
}

export default define('x-theme', {
  props: {
    allVars: {
      get(elem) {
        return Object.assign(elem.mixins.reduce((prev, curr) => {
          const theme = document.getElementById(curr);
          return theme ? Object.assign(prev, theme.allVars) : prev;
        }, {}), elem.ownVars);
      },
    },
    id: prop.string({
      attribute: true,
    }),
    mixin: prop.string({
      attribute: true,
    }),
    ownVars: {
      default: varsFromChildren,
    },
  },
  detached(elem) {
    const themeFor = elem.id;
    emit(document, `x-theme-${themeFor}`, { detail: (themes[themeFor] = {}) });
  },
  updated(elem, prev) {
    const newThemeFor = elem.id;
    const oldThemeFor = prev && prev.id;

    // Make sure props have changed.
    if (!Component.updated(elem, prev)) {
      return;
    }

    if (oldThemeFor) {
      emit(document, `x-theme-${oldThemeFor}`, {
        detail: (themes[oldThemeFor] = {}),
      });
    }

    if (newThemeFor) {
      emit(document, `x-theme-${newThemeFor}`, {
        detail: (themes[newThemeFor] = elem.allVars),
      });
    }

    // Only need to render the first time.
    // eslint-disable-next-line consistent-return
    return !prev;
  },
  render(elem) {
    style({ ':host': { display: 'none' } });
    return <slot elem={elem} onSlotchange={() => (elem.ownVars = varsFromChildren(elem))} />;
  },
  prototype: {
    get mixins() {
      return this.mixin.split(' ');
    },
  },
});
