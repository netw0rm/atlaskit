import themes from './themes';

const $handleThemeChanged = Symbol();
const tagNameLC = e => e.tagName.toLowerCase();

function getThemeVars(id) {
  return themes[id] || {};
}

function themeNameHandler(elem, data) {
  const { newValue, oldValue } = data;
  if (newValue !== oldValue) {
    if (oldValue) {
      document.removeEventListener(`x-theme-${oldValue}`, elem[$handleThemeChanged]);
    }
    if (newValue) {
      elem[$handleThemeChanged] = () => (elem.themeVars = getThemeVars(newValue));
      document.addEventListener(`x-theme-${newValue}`, elem[$handleThemeChanged]);
      elem.themeVars = getThemeVars(newValue);
    }
  }
}

export default function (opts) {
  const { props } = opts;
  return Object.assign({}, opts, {
    props: Object.assign({
      themeName: { attribute: true, initial: tagNameLC, set: themeNameHandler },
      themeVars: { default() { return {}; } },
    }, props || {}),
  });
}
