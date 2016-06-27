import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';

import { define, vdom, prop } from 'skatejs';
import Layer from 'ak-layer';

import webanimation from 'web-animations-js/web-animations-next.min'; // eslint-disable-line no-unused-vars, max-len

// function getAnimationFromPosition(position) {
//   return position.split(' ')[0];
// }

// const Animations = {
//   left: [
//     { transform: 'translate3d(100%, 0, 0)' },
//     { transform: 'translate3d(0, 0, 0)' },
//   ],
//   bottom: [
//     { transform: 'translate3d(0, -100%, 0)' },
//     { transform: 'translate3d(0, 0, 0)' },
//   ],
//   right: [
//     { transform: 'translate3d(-100%, 0, 0)' },
//     { transform: 'translate3d(0, 0, 0)' },
//   ],
//   top: [
//     { transform: 'translate3d(0, 100%, 0)' },
//     { transform: 'translate3d(0, 0, 0)' },
//   ],
// };

const definition = {
  attached(elem) {
    elem.className = headStyles.akInlineDialog; // eslint-disable-line no-param-reassign
  },
  render(elem) {
    // let inlineDialogContainer;

    vdom.style(shadowStyles.toString());
    vdom.create(Layer, {
      position: elem.position,
      target: elem.target,
      movable: elem,
    }, () => {
      const divAttrs = {
        class: shadowStyles.locals.inlineDialogContainer,
      };
      vdom.div(divAttrs, () => {
        vdom.slot();
      });
    });

    // if (elem.open) {
    //   const anim = getAnimationFromPosition(elem.position);
    //
    //   if (anim === 'left' || anim === 'right') {
    //    // anim = Alignment.getAlignmentSnap(document.querySelector(elem.target)).horizontal;
    //   } else {
    //    // anim = Alignment.getAlignmentSnap(document.querySelector(elem.target)).vertical
    //   }
    //
    //   inlineDialogContainer.animate(Animations[anim], {
    //     duration: elem.duration,
    //     iterations: 1,
    //   });
    // }
  },
  props: {
    position: prop.string({ attribute: true, default: 'right middle' }),
    open: prop.boolean({ attribute: true, default: false }),
    duration: prop.number({ attribute: true, default: 100 }),
    target: prop.string({ attribute: true }),
  },
};

export default define('ak-inline-dialog', definition);
