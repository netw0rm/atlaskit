import webanimation from 'web-animations-js/web-animations-next.min'; // eslint-disable-line no-unused-vars, max-len
import React, { Component } from 'react';
import { Animation } from 'react-web-animation';
import ReactDOM from 'react-dom';

import { define, prop, vdom, state } from 'skatejs';
import css from './index.less';

/* I didn't bother spiking the actal consumption of the animations, because it should be almost
   identical to the others. We've discussed how we consume without exposing implementation detail
   but have decided that exposing it would not be a problem in this case as it will be native soon.

   Animations will consist of two main bits, the keyframes and the timings. I think we should have
   them behind a function that takes the parameters to the animation and either:
   a) return the animation player object (and start playing if they havent set it not to)
   b) return a function that returns the player object above (configure an animation once, call
      it as you need it)
   c) just return the keyframes and timing objects
   d) return an object that contains a+b or a+c (to allow both consumption methods
   e) have separate functions for React vs non-react consumption                                  */


function animateRegularDomBox() {
  const box = document.getElementById('box2');
  box.animate([
    { transform: 'scale3d(1, 1, 1)', offset: 0 },
    { transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3 },
    { transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4 },
    { transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5 },
    { transform: 'scale3d(.95, 1.05, 1)', offset: 0.65 },
    { transform: 'scale3d(1.05, .95, 1)', offset: 0.75 },
    { transform: 'scale3d(1, 1, 1)', offset: 1 },
  ], {
    duration: 2000,
    iterations: 1,
  });
}

define('bounce-box', {
  properties: {
    amount: prop.number({
      attribute: true,
    }),

    styles: {
      default() {
        return {};
      },
    },
  },
  events: {
    click(elem) {
      elem.animate([
        { transform: 'scale3d(1, 1, 1)', offset: 0 },
        { transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3 },
        { transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4 },
        { transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5 },
        { transform: 'scale3d(.95, 1.05, 1)', offset: 0.65 },
        { transform: 'scale3d(1.05, .95, 1)', offset: 0.75 },
        { transform: 'scale3d(1, 1, 1)', offset: 1 },
      ], {
        duration: 3000,
        iterations: 1,
      });
      setTimeout(() => {
        state(elem, { styles: { } });
      }, 30);
    },
  },

  render(elem) {
    const divAttrs = {
      class: css.locals.blackBox,
      style: elem.styles,
    };

    vdom.style(css.toString());
    vdom.div(divAttrs, 'A custom component');
  },
});

export default define('x-hello', {
  properties: {
    name: { attribute: true },
    speed: prop.number(),
  },
  render() {
    vdom.style(css.toString());
    vdom.div({ class: css.locals.helloContainer }, () => {
      vdom.div({ class: css.locals.blackBox, onclick: animateRegularDomBox, id: 'box1' },
        'Rubber Band');
    });
  },
});

class Basic extends Component {

  getKeyFrames() {
    return [
        { transform: 'scale(1)', opacity: 1, offset: 0 },
        { transform: 'scale(.5)', opacity: 0.5, offset: 0.3 },
        { transform: 'scale(.667)', opacity: 0.667, offset: 0.7875 },
        { transform: 'scale(.6)', opacity: 0.6, offset: 1 },
    ];
  }

  getTiming(duration) {
    return {
      duration,
      easing: 'ease-in-out',
      delay: 0,
      iterations: 3,
      direction: 'alternate',
      fill: 'none',
    };
  }

  render() {
    return React.createElement(Animation, {
      keyframes: this.getKeyFrames(),
      timing: this.getTiming(2500),
    },
          React.createElement('div', { style: {
            color: 'red',
          } },
            'Web Animations API Rocks')
    );
  }
}

/* Terrible hack to make sure the dom is loaded before trying to append to it. Only for POC */

setTimeout(() => {
  ReactDOM.render(
    React.createElement(Basic, { name: 'World' }),
    document.getElementById('reactContainer')
  );
}, 10);

if (typeof window !== 'undefined') {
  window.React = React;
}
