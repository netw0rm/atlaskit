import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len

import { define, vdom, prop } from 'skatejs';
import { Alignment } from 'akutil-common';

export default define('ak-layer', {
  props: {
    position: prop.string(),
    target: prop.string(),
  },
  detached(elem) {
    elem.alignment && elem.alignment.destroy();
  },
  render(elem) {
    if (elem.alignment) {
      elem.alignment.update(elem);
      elem.alignment.reposition();
    } else if (elem.position && elem.target) {
      elem.alignment = new Alignment(elem); // eslint-disable-line no-param-reassign
    }

    vdom.slot({ name: 'layer' });
  },
});

