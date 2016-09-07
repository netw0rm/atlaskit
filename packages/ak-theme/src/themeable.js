import { themeChanged } from './events';
import { themeHandlers, themeNameFromNode } from './themes';

function setThemeName(elem, data) {
  const { newValue } = data;
  const theme = document.getElementById(newValue);
  elem.themeVars = theme ? theme.allVars : {};
}

export default function (opts) {
  const { props } = opts;
  return Object.assign({}, opts, props || {}, {
    props: Object.assign({
      themeName: { attribute: true, initial: themeNameFromNode, set: setThemeName },
      themeVars: { default() { return {}; } },
    }),
    attached(elem) {
      if (opts.created) {
        opts.created(elem);
      }

      document.addEventListener(themeChanged, themeHandlers.set(elem, e => {
        const { themeName, themeVars } = e.detail;
        if (elem.themeName === themeName) {
          elem.themeVars = themeVars;
        }
      }).get(elem));
    },
    detached(elem) {
      if (opts.detached) {
        opts.detached(elem);
      }
      document.removeEventListener(themeChanged, themeHandlers.get(elem));
    },
  });
}
