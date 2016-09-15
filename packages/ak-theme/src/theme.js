import { Component, emit, prop, vdom, define } from 'skatejs';
import { style } from 'akutil-common';
import { change } from './events';

function notify(themeName = null, themeProps = null) {
  emit(document, change, { detail: { themeName, themeProps } });
}

function varsFromChildren(host) {
  return [...host.children].reduce((prev, curr) => {
    const [key, val] = [curr.getAttribute('name'), curr.getAttribute('value')];

    if (!key) {
      return prev;
    }

    if (key.indexOf('.') > -1) {
      const keys = key.split('.');
      const first = keys.shift();
      const last = keys.pop();

      // If there is already a value for the first part of the object, we use
      // that instead of creating a new one.
      prev[first] = prev[first] || {};

      // We store the nested object here so that we can loop over the parts of
      // the var name and do the smae thing we did above for each part, storing
      // the nested object as its value. Once we're done, the value of obj will
      // be the inner-most nested value and we can set the variable value to
      // it.
      let obj = prev[first];

      while (keys.length) {
        const part = keys.shift();
        obj = obj[part] || (obj[part] = {});
      }

      // This will be the inner-most object, so we set the last part of the key
      // to the theme var value.
      obj[last] = val;
    } else {
      prev[key] = val;
    }

    return prev;
  }, {});
}

function mixins(elem) {
  return elem.mixin.split(' ');
}

export default define('ak-theme', {
  props: {
    /**
     * @description The id of the theme. This is used to identify the theme a given component should
     * use.
     * @type {string}
     */
    id: prop.string({
      attribute: true,
    }),
    /**
     * @description Space-separated ids of other themes that should be mixed in (in order of
     * appearance) into this theme, this theme overriding any conflicts.
     * @type {string}
     */
    mixin: prop.string({
      attribute: true,
    }),
    /**
     * @description Returns the theme variables for only this theme, excluding any mixed in themes.
     * @type {string}
     */
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
    const themeUnassigned = oldThemeId && !newThemeId && oldThemeId !== newThemeId;

    // If it's the first render we need to populate the ownVars.
    if (firstRender) {
      elem.ownVars = varsFromChildren(elem);
    }

    // If the theme changed and it changed from something to nothing, notify that the theme has
    // been removed by sending a nulled themeProps.
    if (themeUnassigned) {
      notify(oldThemeId);
    } else {
      notify(newThemeId, elem.allVars);
    }

    // Only need to render the first time.
    // eslint-disable-next-line consistent-return
    return firstRender;
  },
  render(elem) {
    const update = () => (elem.ownVars = varsFromChildren(elem));
    style(vdom, { ':host': { display: 'none' } });
    return <slot onSlotchange={update} onThemePropChange={update} />;
  },
  prototype: {
    /**
     * @description Returns own and theme vars inherited from mixins.
     * @type {object}
     */
    get allVars() {
      return Object.assign(mixins(this).reduce((prev, curr) => {
        const theme = document.getElementById(curr);
        return theme ? Object.assign(prev, theme.allVars) : prev;
      }, {}), this.ownVars);
    },
  },
});
