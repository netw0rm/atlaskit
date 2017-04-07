import { css, keyframes } from 'styled-components';

// ==============================
// PRIVATE
// ==============================

// Mixin for calculating one prop value into one prop of a keyframe. i.e
// propVals = ['transform', 'translateY(XXpx)', 0, -200]
//   - mod = 0.5;
//   - output: transform: translateY(-100px);
function calcProp(propVals, mod) {
  const propName = propVals[0];
  const str = propVals[1];
  const from = propVals[2];
  const to = propVals[3];

  const newValue = from + ((to - from) * mod);
  const newStr = str.replace('XX', newValue);

  return css`${propName}: ${newStr};`;
}

// Calculating multiple keyframe prop values
// For example: [
//  ['transform', 'translateY(XXpx)', 0, -200]
//  ['opacity', 'XX', 0, 1]
// ]
function calcMultipleProps(props, mod) {
  return props.map(val => calcProp(val, mod));
}

// Mixin used to create the content inside each keyframe.
//
// @values is either an array of animation properties OR an array of arrays.
// The 4 array values are:
//   - PropName is the name of a CSS property (i.e 'transform')
//   - PropString is a string used to create the value of a prop containing an 'XX'
//     somewhere in it to be replaced with a value (i.e 'translate(XXpx)')
//   - StartValue is the first value that will be passed into the PropString (i.e
//     '0')
//   - EndValue is the last value that will be passed into the PropString (i.e
//     200)
//
//   @mod is a value showing how close to the end value a property is (i.e 0 is
//   the start, 1 is the end, 0.5 is half way, 1.2 would be 20% overshoot, etc)

function calculateKeyframe(values, mod) {
  let props;

  if (Array.isArray(values[0])) {
    props = calcMultipleProps(values, mod);
  } else {
    props = calcProp(values, mod);
  }

  return props;
}

// ==============================
// PUBLIC
// ==============================

// Creating an animation is simple as defining each of the properties you want
// to animate:
//   @slideUp: 'transform', 'translateY(XXpx)', 20, 0;
//   @fadeIn: 'opacity', 'XX', 0, 1;
//
// Each animation property is a 4-tuple of the CSS prop name to animate, a
// string for creating the value of said prop (MUST contain XX in it some where,
// this is where the numerical value will be placed), a start value and an end
// value. Then simply pass the properties and an animation name to one of the
// mixins below. i.e.
//   .createBoldAnimation(@slideUp @fadeIn; 'slide-up');
//
// If animating more than one property, pass them in space separated from
// eachother. This will output the keyframes for your new animation which can be
// consumed the same way as any other animation. i.e.
//   .slideUpAnimation {
//     animation: slide-up @animationTime @animationDelay backwards;
//   }

function createBold(animatedProperties) {
  return keyframes`
    0% {
      ${calculateKeyframe(animatedProperties, 0)}
      animation-timing-function: cubic-bezier(0.23830050393398, 0, 0.25586732616931, 0.79011192334632);
    }
    20% {
      ${calculateKeyframe(animatedProperties, 0.8)}
      animation-timing-function: cubic-bezier(0.21787238302442, 0.98324004924648, 0.58694150667646, 1);
    }
    100% {
      ${calculateKeyframe(animatedProperties, 1)}
    }
  `;
}

function createOptimistic(animatedProperties) {
  return keyframes`
    0% {
      ${calculateKeyframe(animatedProperties, 0)}
      animation-timing-function: cubic-bezier(0.33333333, 0, 0.4, 1);
    }
    20% {
      ${calculateKeyframe(animatedProperties, 1.05)}
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    76% {
      ${calculateKeyframe(animatedProperties, 0.975)}
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      ${calculateKeyframe(animatedProperties, 1)}
    }
  `;
}

function createCombined(animatedProperties) {
  return keyframes`
    0% {
      ${calculateKeyframe(animatedProperties, 0)}
      animation-timing-function: cubic-bezier(0.4, 0, 0.15, 1);
    }
    50% {
      ${calculateKeyframe(animatedProperties, 1.1)}
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      ${calculateKeyframe(animatedProperties, 1)}
    }
  `;
}

export default {
  createBold,
  createCombined,
  createOptimistic,
};
