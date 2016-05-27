import dynamics from 'dynamics.js';
import objectAssign from 'object-assign';
import wrapAnimation from './wrap-animation';

export default function(opts) {
  const defaultOps = {
    duration: 1000,
    amount: 1.3
  };

  opts = objectAssign(defaultOps, opts || {});

  // This will return the list wrapped in an object with a Symbol() for the key
  return wrapAnimation([{ //initial prop states, any prop that changes needs to be declared here
    propsFrom: {
      transform: 'scale(1)'
    },
    propsTo: {
      transform: `scale(${opts.amount})`
    },
    opts: {
      duration: opts.duration,
      type: dynamics.bounce
    }
  }]);
}
