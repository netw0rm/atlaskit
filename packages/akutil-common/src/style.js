import jss from 'jss';
import nested from 'jss-nested';

const { HTMLContentElement, HTMLSlotElement, ShadowRoot } = window;
const native = fn => (fn || '').toString().indexOf('[native code]') > -1;
const supportsShadowDOM = native(ShadowRoot);
const supportsShadowDOMV0 = supportsShadowDOM && HTMLContentElement;
const supportsShadowDOMV1 = supportsShadowDOM && HTMLSlotElement;

// Fallback to selectorText because jss-nested seems to remove name.
const getRuleSelector = rule => rule.name || rule.selectorText;

jss.use(nested());

// Polyfill :host
// --------------

jss.use((rule) => {
  const selector = getRuleSelector(rule);
  if (selector.indexOf(':host') === 0) {
    if (supportsShadowDOM) {
      rule.selectorText = selector;
    } else {
      const match = rule.selectorText.match(/:host\((.*)\)/);
      const matchSelector = match && match[1] || '';
      rule.selectorText = rule.options.sheet.options.elem.tagName.toLowerCase() + matchSelector;
    }
  }
});

// Polyfill ::slotted
// ------------------

jss.use((rule) => {
  const selector = getRuleSelector(rule);
  if (selector.indexOf('::slotted') > -1) {
    const match = selector.match(/(.*)::slotted\((.*)\)/);
    const matchSlot = match && match[1] || '';
    const matchSelector = match && match[2] || '';
    if (supportsShadowDOMV1) {
      rule.selectorText = selector;
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
    if (ShadowRoot && e instanceof ShadowRoot) {
      // v0: parentNode
      // v1: host
      return e.parentNode || e.host;
    }

    if (e.shadowRoot) {
      return e;
    }
  }
}

export default function ({ element }, css) {
  let ret;

  // Currently this will get run on every render because it's not in the outer
  // scope (i.e. different fn reference every time).
  function ref(e) {
    const sheet = jss.createStyleSheet(css, { elem: findHost(e) });
    ret = sheet.classes;
    e.textContent = sheet.toString();
  }
  element('style', { css, ref, skip: true });
  return ret;
}
