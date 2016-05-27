import atlasBounce from './atlas-bounce';
import atlasGrow from './atlas-grow';
import atlasBounceGrow from './atlas-bounce-grow';
import atlasPulse from './atlas-pulse';

import css from './index.less';
import dynamics from 'dynamics.js';
import { skate, prop, vdom } from 'skatejs';
import objectAssign from 'object-assign';
import key from './key';

function playAnimation(elem, animation) {
  // Need to pre-calculate the change and done function for each animation part
  const optsList = [];
  for(let i = 0; i < animation.length; i++) {
    const opts = objectAssign(animation[i].opts, {
      // Add a change handler to the animation to update our styles
      change: (changeData) => {
        //use objectAssign to make sure we get a new reference each time
        changeData = animation[i].postProcess(changeData);
        elem.styles = objectAssign({}, changeData);
      },
      // Add a done handler to call the next animation if there is one
      complete: () => {
        // If there are more animations queued, call the next one
        if(i + 1 < animation.length) {
          // Put the inital styles on our element
          objectAssign(elem.styles, animation[i+1].propsFrom);
          dynamics.animate(elem.styles, animation[i+1].propsTo, optsList[i+1]);
        }
      }
    });
    optsList.push(opts);
  }
  // Call the first animation to kick it off
  objectAssign(elem.styles, animation[0].propsFrom);
  dynamics.animate(elem.styles, animation[0].propsTo, optsList[0]);
}

skate('atlas-animation', {
  properties: {
    animationOptions: {
      default () {
        return {};
      }
    },
    animation: {
      default() {
        return () => {}; //no-op
      }
    },
    styles: {
      default() {
        return {
          cursor: 'pointer',
          zIndex: 0
        };
      },
      render() {
        return true;
      }
    }
  },
  render (elem) {
    vdom.style(css.toString());
    vdom.div({
      class: css.locals.testing,
      onclick: () => {
        const animation = elem.animation(elem.animationOptions)[key];
        playAnimation(elem, animation);
      },
      style: elem.styles
    }, function () {
      vdom('slot');
    });
  }
});

export default skate('x-hello', {
  properties: {
    name: { attribute: true },
    speed: prop.number()
  },
  render () {
    vdom('atlas-animation', { animationOptions: {duration: 1000, amount: 100}, animation: atlasBounce}, function () {
      vdom.div('Bounce');
    });
    vdom('atlas-animation', { animationOptions: {duration: 2000}, animation: atlasGrow}, function () {
      vdom.div('Grow');
    });
    vdom('atlas-animation', { animationOptions: {duration: 2000, bounceAmount: 200, growAmount: 1.3}, animation: atlasBounceGrow}, function () {
      vdom.div('Bounce-Grow');
    });
    vdom('atlas-animation', { animationOptions: {duration: 2000, amount: 200, color: '#ff0000', opacity: '0.3'}, animation: atlasPulse}, function () {
      vdom.div('Pulse');
    });
  }
});
