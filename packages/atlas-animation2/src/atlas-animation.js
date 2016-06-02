import dynamics from 'dynamics.js';
import objectAssign from 'object-assign';

// This is to abstract away the implementation of the animtions
export default function (animation) {
  // We return a function  that can be called with different step and done
  // functions using the same opts used to create the original animation
  // should we allow the user to overwrite those here as well?
  return function animate(stepFn, doneFn) {
    const opts = objectAssign(animation.opts, {
      // if there is a postProcess function in the animation, return the results of that to the
      // step callback instead
      change: animation.postProcess ? (style) => {
        stepFn(animation.postProcess(style));
      } : stepFn,
      complete() {
        this.change(animation.propsFrom);
        if (doneFn) {
          doneFn();
        }
      },
    });

    // We work with a copy of props from because otherwise we can lose the reference to the
    // original state
    const animationState = objectAssign({}, animation.propsFrom);
    dynamics.animate(animationState, animation.propsTo, opts);
  };
}
