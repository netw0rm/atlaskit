import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { define, vdom, prop } from 'skatejs';
import Layer from 'ak-layer/src';


export default define('ak-inline-dialog', {
  render(elem) {
    vdom.style(shadowStyles.toString());
    vdom.create(Layer, {
      attachment: elem.attachment, targetAttachment: elem.targetAttachment, target: elem.target,
    }, () => {
      // vdom.create(Animation, {
      //   animation: atlasPulse,
      //   animateOn: ['click', 'mouseover'],
      //   animationOptions: { duration: 2000 },
      // }, () => {
      //   vdom.slot();
      // });
      const divAttrs = {
        class: shadowStyles.locals.inlineDialogContainer,
      };
      vdom.div(divAttrs, () => {
        vdom.slot();
      });
    });
  },
  props: {
    attachment: prop.string({ attribute: true }),
    targetAttachment: prop.string({ attribute: true }),
    open: prop.boolean({ attribute: true }),
  },
});
