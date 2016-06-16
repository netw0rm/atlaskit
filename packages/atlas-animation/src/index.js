/* eslint-disable no-param-reassign */
import atlasBounce from './atlas-bounce';
import atlasGrow from './atlas-grow';
import atlasBounceGrow from './atlas-bounce-grow';
import atlasPulse from './atlas-pulse';
import atlasFlyTo from './atlas-fly-to';

import css from './index.less';
import dynamics from 'dynamics.js';
import { define, prop, vdom } from 'skatejs';
import objectAssign from 'object-assign';
import key from './key';

// Still not sure I like this solution as it is a bit convoluted, the way it used the completed
// callback to trigger the next animation.
function playAnimation(elem, animation) {
  // Need to pre-calculate the change and done function for each animation part
  const optsList = [];
  for (let i = 0; i < animation.length; i++) {
    const opts = objectAssign(animation[i].opts, {
      // Add a change handler to the animation to update our styles
      change: (changeData) => {
        // use objectAssign to make sure we get a new reference each time
        const processedChangeData = animation[i].postProcess(changeData);
        elem.styles = objectAssign({}, processedChangeData);
      },
      // Add a done handler to call the next animation if there is one
      complete: () => {
        // If there are more animations queued, call the next one
        if (i + 1 < animation.length) {
          // Put the inital styles on our element
          objectAssign(elem.styles, animation[i + 1].propsFrom);
          dynamics.animate(elem.styles, animation[i + 1].propsTo, optsList[i + 1]);
        } else {
          elem.animating = false;
        }
      },
    });
    optsList.push(opts);
  }
  // Call the first animation to kick it off
  objectAssign(elem.styles, animation[0].propsFrom);
  dynamics.animate(elem.styles, animation[0].propsTo, optsList[0]);
}

define('atlas-animation', {
  props: {
    animationOptions: {
      default() {
        return {};
      },
      set(elem, data) {
        // if we are setting this for the first time and animating is already set, set it again
        // to make sure we trigger the change handler
        if (data.oldValue === undefined && elem.animating) {
          elem.animating = false;
          elem.animating = true;
        }
      },
    },
    animation: {
      default() {
        return () => {}; // no-op
      },
      set(elem, data) {
        // if we are setting this for the first time and animating is already set, set it again
        // to make sure we trigger the change handler
        if (data.oldValue === undefined && elem.animating) {
          elem.animating = false;
          elem.animating = true;
        }
      },
    },
    animating: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (data.newValue && (data.newValue !== data.oldValue)) {
          // need to check that the other attributes have been set already,
          // if not we can wait as they will trigger a new animation once they are
          if (elem.animation &&
              elem.animationOptions &&
              elem.animation(elem, elem.animationOptions)) {
            const animation = elem.animation(elem, elem.animationOptions)[key];
            playAnimation(elem, animation);
          }
        }
      },
    }),
    animateOn: prop.array({
      attribute: true,
    }),
    styles: {
      default() {
        return {
          cursor: 'pointer',
          zIndex: 0,
        };
      },
      render() {
        return true;
      },
    },
  },
  prototype: {
    animate() {
      this.animating = true;
    },
  },
  render(elem) {
    const divAttrs = {
      class: css.locals.animation,
      style: elem.styles,
    };

    elem.animateOn.forEach(on => { divAttrs[`on${on}`] = elem.animate.bind(elem); });

    vdom.style(css.toString());
    vdom.div(divAttrs, () => {
      vdom.create('slot');
    });
  },
});

export default define('x-hello', {
  props: {
    name: { attribute: true },
    speed: prop.number(),
  },
  render() {
    vdom.style(css.toString());
    vdom.div({ class: css.locals.helloContainer }, () => {
      vdom.create('atlas-animation', {
        style: 'color: red',
        animation: atlasBounce,
        animateOn: ['click'],
        animationOptions: { duration: 1000, amount: 100 },
      }, () => {
        vdom.div({ class: css.locals.blackBox }, 'Bounce');
      });
      vdom.create('atlas-animation', {
        animation: atlasGrow,
        animateOn: ['click', 'mouseover'],
        animationOptions: { duration: 2000 },
      }, () => {
        vdom.div({ class: css.locals.blackBox }, 'Grow');
      });
      vdom.create('atlas-animation', {
        animation: atlasBounceGrow,
        animateOn: ['click'],
        animationOptions: { duration: 2000, bounceAmount: 200, growAmount: 1.3 },
      }, () => {
        vdom.div({ class: css.locals.blackBox }, 'Bounce->Grow');
      });
      vdom.create('atlas-animation', {
        animation: atlasPulse,
        animating: true, animateOn: ['click'],
        animationOptions: { duration: 2000, amount: 200, color: '#ff0000', opacity: '0.3' },
      }, () => {
        vdom.div({ class: css.locals.blackBox }, 'Pulse');
      });
      vdom.create('atlas-animation', {
        animation: atlasBounce,
        animateOn: ['click'],
        animationOptions: { duration: 1000, amount: 100 },
      }, () => {
        vdom.create('atlas-animation', {
          animation: atlasGrow,
          animateOn: ['click'],
          animationOptions: { duration: 2000 },
        }, () => {
          vdom.div({ class: css.locals.blackBox }, 'Bounce+Grow');
        });
      });
      vdom.div({ class: css.locals.secondContainer }, () => {
        vdom.create('atlas-animation', { animation: atlasFlyTo,
          animateOn: ['click'],
          animationOptions: { duration: 1000, travelTo: { x: 1230, y: 235 } },
        }, () => {
          vdom.div({ class: css.locals.blackBox }, 'Start here');
        });
      });
      vdom.div({ class: `${css.locals.secondContainer} ${css.locals.alignRight}` }, () => {
        vdom.div({ class: css.locals.dottedBox, id: 'travelTo' }, 'End here');
      });
    });
  },
});
