/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */

import { attachmentMap, getPositionFromClasses, Alignment } from 'akutil-common';
import { define, vdom, prop } from 'skatejs';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, max-len
import Layer from 'ak-layer'; // eslint-disable-line no-unused-vars
import shadowStyles from './shadow.less';
import webanimation from 'web-animations-js/web-animations-next.min'; // eslint-disable-line no-unused-vars, max-len

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

function getAnimationPosition(elem) {
  return elem.actualPosition && attachmentMap[elem.actualPosition]
      ? attachmentMap[elem.actualPosition].animation
      : attachmentMap[elem.position].animation;
}

const definition = {
  attached(elem) {
    elem.className = headStyles.akInlineDialog; // eslint-disable-line no-param-reassign

    if (!elem.tether) {
      elem.tether = new Alignment(elem);  // eslint-disable-line no-param-reassign
    } else {
      elem.tether.enable();
      elem.tether.update(elem);
    }
  },
  observedAttributes: ['class'],
  attributeChanged(elem, data) {
    if (data.newValue) {
      const newPosition = getPositionFromClasses(data.newValue);
      if (newPosition && newPosition !== elem.actualPosition) {
        elem.actualPosition = newPosition; // eslint-disable-line no-param-reassign
      }
    }
  },
  detached(elem) {
    if (elem.tether) {
      elem.tether.destroy();
    }
  },
  render(elem) {
    if (elem.tether) {
      elem.tether.update(elem);
    }
    return (
      <AnimmyTest alignment={getAnimationPosition(elem)}>
        <style>{shadowStyles.toString()}</style>
        <div class={shadowStyles.locals.inlineDialogContainer}>
          <slot />
        </div>
      </AnimmyTest>
    );
  },
  props: {
    position: prop.string({ attribute: true, default: 'right middle' }),
    open: prop.boolean({ attribute: true }),
    target: prop.string({ attribute: true }),
    actualPosition: prop.string({ attribute: true }),
    attachment: prop.string({ attribute: true, default: 'window' }),
    renderElementTo: prop.string({ attribute: true }),
  },
};

const AnimmyTest = define('ak-animmytest', { // eslint-disable-line no-unused-vars
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
    if (elem.alignment && Animations[elem.alignment]) {
      container.animate(Animations[elem.alignment], {
        duration: 200,
        iterations: 1,
      });

      setTimeout(() => {
        container.className = '';
      });
    }
  },
  props: {
    alignment: prop.string({ attribute: true }),
  },
});

export default define('ak-inline-dialog', definition);
