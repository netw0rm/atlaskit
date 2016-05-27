import key from './key';

/* We can use this as a way to encapsulate any
common functionality in our animations that we
don't want to repeat */

export default function(animation) {
  // We want to wrap the output of animation functions so that they are not exposed as API
  const o = {};
  o[key] = animation;

  animation.forEach(function(animationPart) {
    // Animations can have an optional postProcess function to transform the changeData
    // If one is not present, just return changeData (this is called on every update)
    if(!animationPart.postProcess) {
      animationPart.postProcess = function(changeData) {
        return changeData;
      };
    }
  });

  return o;
}
