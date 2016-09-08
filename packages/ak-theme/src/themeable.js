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
      themeName: { attribute: true, initial: themeNameFromNode, set: applyTheme },
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
