/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */

import { vdom, prop } from 'skatejs';
import { Alignment } from 'akutil-common';

export default {
  props: {
    position: prop.string({ attribute: true, default: 'right middle' }),
    attachment: prop.string({ attribute: true, default: 'window' }),
    target: prop.string({ attribute: true }),
    renderElementTo: prop.string({ attribute: true }),
    doNotMoveInDOM: prop.boolean({ attribute: true, default: false }),
    open: prop.string({
      attribute: true,
      set(elem) {
        if (elem.alignment) {
          elem.alignment.reposition();
        }
      },
    }),
  },
  attached(elem) {
    if (!elem.alignment) {
      elem.alignment = new Alignment(elem);  // eslint-disable-line no-param-reassign
    } else {
      elem.alignment.enable();
      elem.alignment.update(elem);
    }
  },
  detached(elem) {
    if (elem.alignment) {
      elem.alignment.destroy();
    }
  },
  render(elem) {
    if (elem.alignment) {
      elem.alignment.update(elem);
    }

    return (
      <slot name="layer" />
    );
  },
};
