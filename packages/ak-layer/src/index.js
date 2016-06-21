import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len

import { define, vdom, prop } from 'skatejs';
import Tether from 'tether';

export default define('ak-layer', {
  props: {
    attachment: prop.string({ attribute: true }),
    targetAttachment: prop.string({ attribute: true }),
    target: prop.string({ attribute: true }),
  },
  attached(elem) {
    elem.__tether = new Tether({  // eslint-disable-line no-underscore-dangle, no-param-reassign
      element: elem,
      target: document.querySelector(elem.target),
      attachment: elem.attachment,
      targetAttachment: elem.targetAttachment,
    });
  },
  detached(elem) {
    elem.__tether.destroy();  // eslint-disable-line no-underscore-dangle, no-param-reassign
  },
  render() {
    vdom.slot();
  },
});
