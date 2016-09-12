import { themeChanged } from './events';
import { themeHandlers, themeNameFromNode } from './themes';

function applyTheme(elem, data) {
  const { newValue } = data;
  const theme = document.getElementById(newValue);
  elem.themeVars = theme ? theme.allVars : {};
}

export default function (opts) {
  const { attached, detached, props } = opts;
  return Object.assign({}, opts, {
    props: Object.assign({}, props, {
      /**
       * @description The id of the theme the component should use. This defaults to the tag name
       * of the component.
       * @type {string}
       */
      themeName: { attribute: true, initial: themeNameFromNode, set: applyTheme },
      /**
       * @description The deserialised variables from the component's current theme. These are
       * automatically kept in sync.
       * @type {string}
       */
      themeVars: { default() { return {}; } },
    }),
    attached(elem) {
      if (attached) {
        attached(elem);
      }

      applyTheme(elem, { newValue: elem.themeName });
      document.addEventListener(themeChanged, themeHandlers.set(elem, e => {
        const { themeName, themeVars } = e.detail;
        if (elem.themeName === themeName) {
          elem.themeVars = themeVars;
        }
      }).get(elem));
    },
    detached(elem) {
      if (detached) {
        detached(elem);
      }
      document.removeEventListener(themeChanged, themeHandlers.get(elem));
    },
  });
}
