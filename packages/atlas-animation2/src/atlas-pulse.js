import dynamics from 'dynamics.js';
import objectAssign from 'object-assign';
import atlasAnimation from './atlas-animation';

export default function (opts) {
  const defaultOps = {
    duration: 1000,
    amount: 100,
  };

  const combinedOpts = objectAssign(defaultOps, opts || {});

  const animation = { // initial prop states, any prop that changes needs to be declared here
    propsFrom: {
      'box-shadow-1': '0px 0px 0px 0px rgba(89,175,225,0.14)',
      'box-shadow-2': '0px 0px 0px 0px rgba(255,0,0,0.14)',
    },
    propsTo: {
      'box-shadow-1': '0px 0px 0px 15px rgba(89,175,225,0.14)',
      'box-shadow-2': '0px 0px 0px 30px rgba(255,0,0,0.14)',
    },
    // Optional function to process the propsTo and return it in a different format.
    // Used to get around issues with multiple transforms/box-shadows/etc
    postProcess(changeData) {
      return {
        'box-shadow': `${changeData['box-shadow-1']}, ${changeData['box-shadow-2']}`,
      };
    },
    opts: {
      duration: combinedOpts.duration,
      type: dynamics.bezier,
      points: [{ x: 0, y: 0, cp: [{ x: 0.1, y: 0 }] },
        { x: 0.22, y: 0.708, cp: [{ x: 0.12, y: 0.708 },
        { x: 0.32, y: 0.708 }] }, { x: 0.509, y: 1.014, cp: [{ x: 0.341, y: 0.051 },
        { x: 0.691, y: -0.089 }] }, { x: 0.815, y: 0.699, cp: [{ x: 0.715, y: 0.699 },
        { x: 0.915, y: 0.699 }] }, { x: 1, y: 0, cp: [{ x: 0.9, y: 0 }],
      }],
    },
  };

  // Return a function that can be called to run the animation
  return atlasAnimation(animation);
}
