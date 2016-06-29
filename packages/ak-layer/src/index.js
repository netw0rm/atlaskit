import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len

import { define, vdom, prop } from 'skatejs';
import { Alignment } from 'akutil-common';

export default define('ak-layer', {
  props: {
    position: prop.string({ attribute: true }),
    target: prop.string({ attribute: true }),
    open: prop.boolean({
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
      elem.alignment.disable();
    }
  },
  render(elem) {
    if (elem.alignment) {
      elem.alignment.update(elem);
    }

    vdom.element('slot', { name: 'layer' });
  },
});


// const maps = {
//   alignment: new WeakMap(),
// };
//
// export default define('ak-layer', {
//   props: {
//     position: prop.string(),
//     target: prop.string(),
//   },
//   attached(elem) {
//     maps.alignment.set(elem, new Alignment(elem));
//   },
//   detached(elem) {
//     maps.alignment.get(elem).destroy();
//   },
//   render() {
//     vdom.element('slot');
//   },
// });
