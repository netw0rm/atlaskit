import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { skate, vdom } from 'ak-base-component';
import Tether from 'tether';

const layerable = {
  alignment: prop.string({ attribute: true }),
  alignTo: prop.string({ attribute: true })
};

export default skate('ak-layer', {
  props: {
    alignment: layerable.alignment,
    alignTo: layerable.alignTo
  },
  attached (elem) {
    elem.__tether = new Tether({
      element: elem,
      target: elem.alignTo,
      attachment: layerable.alignment
    });
  },
  detached (elem) {
    elem.__tether.destroy();
  },
  render (elem) {
    vdom.slot();
  }
});
