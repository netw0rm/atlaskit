import dynamics from 'dynamics.js';
import objectAssign from 'object-assign';
import atlasAnimation from './atlas-animation';

export default function(opts) {
  const defaultOps = {
    duration: 1000,
    amount: 100
  };

  opts = objectAssign(defaultOps, opts || {});

  const animation = { //initial prop states, any prop that changes needs to be declared here
    propsFrom: {
      transform: 'translateY(0px)'
    },
    propsTo: {
      transform: `translateY(-${opts.amount}px)`
    },
    opts: {
      duration: opts.duration,
      type: dynamics.bounce
    }
  };

  // Return a function that can be called to run the animation
  return atlasAnimation(animation);
}
