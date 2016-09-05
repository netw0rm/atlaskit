import { Component, emit, prop, vdom, define } from 'skatejs';
import { style } from 'akutil-common';
import themes from './themes';

function notify(themeName, themeVars = null) {
  if (themeName) {
    if (themeVars) {
      themes[themeName] = themeVars;
    } else {
      delete themes[themeName];
    }
    emit(document, `ak-theme-${themeName}`, { detail: themeVars });
  }
}

function varsFromChildren(host) {
  return [].slice.call(host.children).reduce((prev, curr) => {
    const [key, val] = [curr.getAttribute('name'), curr.getAttribute('value')];

    if (!key) {
      return prev;
    }

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

export default define('ak-theme', {
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
      default() {
        return {};
      },
    },
  },
  detached(elem) {
    notify(elem.id);
  },
  updated(elem, prev) {
    // Make sure props have changed.
    if (!Component.updated(elem, prev)) {
      return;
    }

    const firstRender = !prev;
    const oldThemeId = prev && prev.id;
    const newThemeId = elem.id;

    // If it's the first render we need to populate the ownVars.
    if (firstRender) {
      elem.ownVars = varsFromChildren(elem);
    }

    // Trigger events for the old / new theme ids.
    if (oldThemeId !== newThemeId) {
      notify(oldThemeId);
      notify(newThemeId, elem.allVars);
    }

    // Only need to render the first time.
    // eslint-disable-next-line consistent-return
    return firstRender;
  },
  render(elem) {
    style(vdom, { ':host': { display: 'none' } });
    return <slot onSlotchange={() => (elem.ownVars = varsFromChildren(elem))} />;
  },
  prototype: {
    get mixins() {
      return this.mixin.split(' ');
    },
  },
});
