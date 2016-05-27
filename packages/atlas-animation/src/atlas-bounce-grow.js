import atlasBounce from './atlas-bounce';
import atlasGrow from './atlas-grow';

import objectAssign from 'object-assign';
import key from './key';
import wrapAnimation from './wrap-animation';

// To add two animations, one after another we can simply import both
// Create both sets of params and return them in an array

export default function(opts) {
  const defaultOps = {
    duration: 1000,
    growAmount: 1.3,
    bounceAmount: 100
  };

  opts = objectAssign(defaultOps, opts || {});

  const bounce = atlasBounce({
    duration: opts.duration * 0.4,
    amount: opts.bounceAmount
  })[key];

  const grow = atlasGrow({
    duration: opts.duration * 0.6,
    amount: opts.growAmount
  })[key];

  // This will return the list wrapped in an object with a Symbol() for the key
  return wrapAnimation([...bounce, ...grow]);
}
