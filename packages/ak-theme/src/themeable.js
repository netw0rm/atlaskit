import themes from './themes';

const $handleThemeChanged = Symbol();
const tagNameLC = e => e.tagName.toLowerCase();

function eventName(name) {
  return `ak-theme-${name}`;
}

function getThemeVars(id) {
  return themes[id] || {};
}

function themeNameHandler(elem, data) {
  const { newValue, oldValue } = data;
  if (newValue !== oldValue) {
    if (oldValue) {
      document.removeEventListener(eventName(oldValue), elem[$handleThemeChanged]);
    }
    if (newValue) {
      elem[$handleThemeChanged] = () => (elem.themeVars = getThemeVars(newValue));
      document.addEventListener(eventName(newValue), elem[$handleThemeChanged]);
      elem.themeVars = getThemeVars(newValue);
    }
  }
}

export default function (opts) {
  const { props } = opts;
  return Object.assign({}, opts, props || {}, {
    props: Object.assign({
      themeName: { attribute: true, initial: tagNameLC, set: themeNameHandler },
      themeVars: { default() { return {}; } },
    }),
  });
}
