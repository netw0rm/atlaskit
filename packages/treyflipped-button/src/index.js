import styles, { locals } from './style.less'; // eslint-disable-line no-unused-vars
import { skate, vdom } from 'skatejs';

const div = document.createElement('div');
const hasShadowDom = div.attachShadow || div.createShadowRoot;

function style (styles) {
  if (hasShadowDom) {
    vdom.style(styles.toString());
  } else if (!styles.isInHead) {
    const style = document.createElement('style');
    style.textContent = styles.toString();
    document.head.appendChild(style);
    styles.isInHead = true;
  }
}

export default skate('x-hello', {
  properties: {
    name: { attribute: true }
  },
  render () {
    style(styles);
    vdom.div({ class: locals.testing }, 'testing');
  }
});
