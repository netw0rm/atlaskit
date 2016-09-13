import { themeChanged } from './events';
import { themeNameFromNode } from './themes';

const $themeHandler = Symbol();

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
      document.addEventListener(themeChanged, elem[$themeHandler] = e => {
        const { themeName, themeVars } = e.detail;
        if (elem.themeName === themeName) {
          elem.themeVars = themeVars;
        }
      });
    },
    detached(elem) {
      if (detached) {
        detached(elem);
      }
      document.removeEventListener(themeChanged, elem[$themeHandler]);
    },
  });
}
