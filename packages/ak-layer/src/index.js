import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len

import { define, vdom, prop } from 'skatejs';
import Tether from 'tether';

export default define('ak-layer', {
  props: {
    attachment: prop.string(),
    targetAttachment: prop.string(),
    target: prop.string(),
    open: prop.boolean(),
  },
  detached(elem) {
    elem.tether.destroy();  // eslint-disable-line no-param-reassign
  },
  render(elem) {
    elem.tether && (elem.tether.position());
    if (elem.attachment && elem.targetAttachment) {
      elem.tether = new Tether({  // eslint-disable-line no-param-reassign
        element: elem,
        target: document.querySelector(elem.target),
        attachment: elem.attachment,
        targetAttachment: elem.targetAttachment,
        constraints: [
          {
            to: 'window',
            attachment: 'together',
          },
        ],
        optimizations: {
          moveElement: false,
        },
      });

      if (elem.open && elem.tether) {
        elem.tether.position();
      }
    }
    vdom.slot();
  },
});

