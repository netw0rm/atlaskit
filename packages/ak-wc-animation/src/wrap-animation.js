import key from './key';

/* We can use this as a way to encapsulate any
common functionality in our animations that we
don't want to repeat */

export default function (animation) {
  // We want to wrap the output of animation functions so that they are not exposed as API
  const o = {};
  o[key] = animation;

  animation.forEach((animationPart) => {
    // Animations can have an optional postProcess function to transform the changeData
    // If one is not present, just return changeData (this is called on every update)
    if (!animationPart.postProcess) {
      /* eslint-disable no-param-reassign */
      animationPart.postProcess = (changeData) => changeData;
      /* eslint-enable no-param-reassign */
    }
  });

  return o;
}
