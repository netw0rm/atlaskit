import dynamics from 'dynamics.js';
import objectAssign from 'object-assign';
import wrapAnimation from './wrap-animation';

/* This was just a little test of a moving component, in this case move a component towards a fixed point */
export default function(elem, opts) {
  const defaultOps = {
    duration: 1000,
    travelTo: {
      x: 0,
      y: 0
    }
  };

  opts = objectAssign(defaultOps, opts || {});
  const startingRect = elem.getBoundingClientRect();
  const travelAmount = {
    x: opts.travelTo.x - startingRect.right,
    y: opts.travelTo.y - startingRect.top
  };



  // This will return the list wrapped in an object with a Symbol() for the key
  return wrapAnimation([{ //initial prop states, any prop that changes needs to be declared here
    propsFrom: {
      'transform': 'translate(0px, 0px)'
    },
    propsTo: {
      'transform': `translate(${travelAmount.x}px, ${travelAmount.y}px)`
    },
    opts: {
      duration: opts.duration,
      type: dynamics.forceWithGravity
    }
  }]);
}
