import dynamics from 'dynamics.js';
import objectAssign from 'object-assign';
import wrapAnimation from './wrap-animation';

export default function(elem, opts) {
  const defaultOps = {
    duration: 1000,
    amount: 100
  };

  opts = objectAssign(defaultOps, opts || {});
  //a list of animation objects to play {propsFrom, propsTo, opts}

  // We wrap our output in an object with a Symbol for a key to prevent exposing it
  return wrapAnimation([{ //initial prop states, any prop that changes needs to be declared here
    propsFrom: {
      color: '#ffffff',
      transform: 'translateY(0px)'
    },
    propsTo: {
      color: '#ff0000',
      transform: `translateY(-${opts.amount}px)`
    },
    opts: {
      duration: opts.duration,
      type: dynamics.bounce
    }
  }]);
}
