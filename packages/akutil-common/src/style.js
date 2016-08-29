import { vdom } from 'skatejs';
import jss from 'jss';

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
      rule.selectorText = rule.options.sheet.options.elem.tagName.toLowerCase();
    }
  }
});

// Polyfill ::slotted
// ------------------

jss.use(rule => {
  if (rule.name.indexOf('::slotted') === 0) {
    const match = rule.selectorText.match(/::slotted\((.*)\)/);
    const matchSelector = match && match[1] || '';
    if (supportsShadowDOMV1) {
      rule.selectorText = rule.name;
    } else if (supportsShadowDOMV0) {
      rule.selectorText = `::content > ${matchSelector}`;
    } else {
      rule.selectorText = `slot > ${matchSelector}`;
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

export default function (css) {
  let ret;
  function ref(e) {
    const sheet = jss.createStyleSheet(css, { elem: findHost(e) });
    ret = sheet.classes;
    e.textContent = sheet.toString();
  }
  vdom.element('style', { css, ref, skip: true });
  return ret;
}
