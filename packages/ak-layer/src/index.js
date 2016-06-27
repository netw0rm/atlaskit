import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len

import { define, vdom, prop } from 'skatejs';
import { Alignment } from 'akutil-common';

const maps = {
  alignment: new WeakMap(),
};

export default define('ak-layer', {
  props: {
    position: prop.string(),
    target: prop.string(),
  },
  attached(elem) {
    maps.alignment.set(elem, new Alignment(elem));
  },
  detached(elem) {
    maps.alignment.get(elem).destroy();
  },
  render() {
    vdom.element('slot');
  },
});

