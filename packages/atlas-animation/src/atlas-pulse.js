import dynamics from 'dynamics.js';
import objectAssign from 'object-assign';
import wrapAnimation from './wrap-animation';

export default function(elem, opts) {
  const defaultOps = {
    duration: 1000,
    amount: 1.3
  };

  opts = objectAssign(defaultOps, opts || {});

  // This will return the list wrapped in an object with a Symbol() for the key
  return wrapAnimation([{ //initial prop states, any prop that changes needs to be declared here
    propsFrom: {
      'box-shadow-1': '0px 0px 0px 0px rgba(89,175,225,0.14)',
      'box-shadow-2': '0px 0px 0px 0px rgba(255,0,0,0.14)'
    },
    propsTo: {
      'box-shadow-1': '0px 0px 0px 15px rgba(89,175,225,0.14)',
      'box-shadow-2': '0px 0px 0px 30px rgba(255,0,0,0.14)'
    },
    // Optional function to process the propsTo and return it in a different format. Used to get around issues
    // with multiple transforms/box-shadows/etc
    postProcess: function(changeData) {
      return {
        'box-shadow': `${changeData['box-shadow-1']}, ${changeData['box-shadow-2']}`
      };
    },
    opts: {
      duration: opts.duration,
      type: dynamics.bounce
    }
  }]);
}
