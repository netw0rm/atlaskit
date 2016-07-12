/** @jsx vdom */
/* eslint react/no-unknown-property: 0 */

import { attachmentMap, getPositionFromClasses } from 'akutil-common';
import { vdom, prop } from 'skatejs';
import headStyles from 'style!./host.less'; // eslint-disable-line import/no-unresolved, max-len
import shadowStyles from './shadow.less';
import webanimation from 'web-animations-js/web-animations-next.min'; // eslint-disable-line no-unused-vars, max-len
import 'ak-layer';

const Animations = { // eslint-disable-line no-unused-vars
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
  render(elem) {
    const styles = {};
    if (elem.boxShadow) {
      styles.boxShadow = elem.boxShadow;
    }
    if (elem.padding) {
      styles.padding = elem.padding;
    }
    if (elem.borderRadius) {
      styles.borderRadius = elem.borderRadius;
    }
    return (
      <ak-layer
        open={elem.open}
        position={elem.position}
        attachment={elem.attachment}
        target={elem.target}
        renderElementTo={elem.renderElementTo}
        renderElement={elem}
      >
        <ak-animtest alignment={getAnimationPosition(elem)} open={elem.open}>
          <style>{shadowStyles.toString()}</style>
          <div class={shadowStyles.locals.inlineDialogContainer} style={styles}>
            <slot />
          </div>
        </ak-animtest>
      </ak-layer>
    );
  },
  props: {
    position: prop.string({ attribute: true, default: 'right middle' }),
    open: prop.string({ attribute: true, default: 'false' }),
    target: prop.string({ attribute: true }),
    actualPosition: prop.string({ attribute: true }),
    attachment: prop.string({ attribute: true, default: 'window' }),
    renderElementTo: prop.string({ attribute: true }),
    boxShadow: prop.string({ attribute: true }),
    borderRadius: prop.string({ attribute: true }),
    padding: prop.string({ attribute: true }),
  },
};

const AnimmyTestDefinition = { // eslint-disable-line no-unused-vars
  render(elem) {
    const container = vdom.element('div', {
      class: shadowStyles.locals.animateContainer,
    }, () => {
      vdom.element('div', {}, () => {
        vdom.element('slot');
      });
    });
    if (elem.alignment && Animations[elem.alignment]) {
      container.firstChild.className = shadowStyles.locals.animateContainerInner;
      container.firstChild.animate(Animations[elem.alignment], {
        duration: 200,
        iterations: 1,
      });

      setTimeout(() => {
        container.firstChild.className = '';
      }, 200);
    }
  },
  props: {
    alignment: prop.string({ attribute: true }),
    open: prop.string({ attribute: true }),
  },
};

export default definition;
export { AnimmyTestDefinition };
