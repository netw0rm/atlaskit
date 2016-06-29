import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len

import { define, vdom, prop } from 'skatejs';
import { Alignment } from 'akutil-common';

export default define('ak-layer', {
  props: {
    position: prop.string(),
    target: prop.string(),
    open: prop.boolean({
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
      elem.alignment.disable();
    }
  },
  render(elem) {
    if (elem.alignment) {
      elem.alignment.update(elem);
    }

    vdom.slot({ name: 'layer' });
  },
});

