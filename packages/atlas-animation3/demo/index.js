import demoHTML from './index.html'; // eslint-disable-line no-unused-vars
import webanimation from 'web-animations-js/web-animations-next.min'; // eslint-disable-line no-unused-vars, max-len

import { skate, prop, vdom, state } from 'skatejs';
import css from './index.less';


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

skate('bounce-box', {
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

export default skate('x-hello', {
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
