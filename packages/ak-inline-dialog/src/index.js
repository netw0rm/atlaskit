import headStyles from 'style!./host.less'; // eslint-disable-line no-unused-vars, import/no-unresolved, max-len
import shadowStyles from './shadow.less';
import Layer from 'ak-layer'; // eslint-disable-line no-unused-vars

import { define, vdom, prop } from 'skatejs';

import webanimation from 'web-animations-js/web-animations-next.min'; // eslint-disable-line no-unused-vars, max-len

function getAnimationFromPosition(position, isFlipped) {
  let res = position.split(' ')[0];
  if (isFlipped) {
    switch (res) {
      case 'left':
        res = 'right';
        break;
      case 'right':
        res = 'left';
        break;
      case 'top':
        res = 'bottom';
        break;
      case 'bottom':
        res = 'top';
        break;
      default:
    }
  }
  return res;
}

const Animations = {
  left: [
    { transform: 'translate3d(100%, 0, 0)', opacity: 1 },
    { transform: 'translate3d(0, 0, 0)', opacity: 1 },
  ],
  bottom: [
    { transform: 'translate3d(0, -100%, 0)', opacity: 1 },
    { transform: 'translate3d(0, 0, 0)', opacity: 1 },
  ],
  right: [
    { transform: 'translate3d(-100%, 0, 0)', opacity: 1 },
    { transform: 'translate3d(0, 0, 0)', opacity: 1 },
  ],
  top: [
    { transform: 'translate3d(0, 100%, 0)', opacity: 1 },
    { transform: 'translate3d(0, 0, 0)', opacity: 1 },
  ],
};

const definition = {
  attached(elem) {
    elem.className = headStyles.akInlineDialog; // eslint-disable-line no-param-reassign
  },
  observedAttributes: ['flipped'],
  attributeChanged(elem, data) {
    elem.fl = data.newValue === 'true'; // eslint-disable-line no-param-reassign
  },
  render(elem) {
    if (elem.open) {
      vdom.element('style', shadowStyles.toString());
      vdom.element('ak-layer', {
        position: elem.position,
        target: elem.target,
        movable: elem,
        open: elem.open,
      }, () => {
        vdom.element('ak-animmytest', {
          alignment: getAnimationFromPosition(elem.position, elem.fl),
        }, () => {
          const divAttrs = {
            class: shadowStyles.locals.inlineDialogContainer,
          };
          vdom.element('div', divAttrs, () => {
            vdom.element('slot');
          });
        });
      });
    }
  },
  props: {
    position: prop.string({ attribute: true, default: 'right middle' }),
    open: prop.boolean({ attribute: true }),
    duration: prop.number({ attribute: true, default: 100 }),
    target: prop.string({ attribute: true }),
    fl: prop.boolean(),
  },
};

define('ak-animmytest', {
  render(elem) {
    let container;

    vdom.element('div', {
      class: shadowStyles.locals.animateContainer,
    }, () => {
      container = vdom.element('div', {
        class: shadowStyles.locals.animateContainer2,
      }, () => {
        vdom.element('slot');
      });
    });

    container.animate(Animations[elem.alignment], {
      duration: 400,
      iterations: 1,
    });

    setTimeout(() => {
      container.className = '';
    });
  },
  props: {
    alignment: prop.string({ attribute: true }),
  },
});

export default define('ak-inline-dialog', definition);
