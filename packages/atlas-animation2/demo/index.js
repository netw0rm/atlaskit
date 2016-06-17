import { atlasBounce, atlasPulse } from '../src/index.js';

import { define, prop, vdom } from 'skatejs';
import css from './index.less';

const animateBounce = atlasBounce({}); // create a atlasBounce function with the default options
const animatePulse = atlasPulse({});

function animateRegularDomBox() {
  const box = document.getElementById('box2');
  animateBounce((style) => {
    Object.assign(box.style, style);
  });
}

define('bounce-box', {
  props: {
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
      animateBounce((style) => {
        elem.styles = Object.assign({}, style); // eslint-disable-line no-param-reassign
      }, () => {
        animatePulse((style) => {
          elem.styles = Object.assign({}, style); // eslint-disable-line no-param-reassign
        });
      });
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
  props: {
    name: { attribute: true },
    speed: prop.number(),
  },
  render() {
    vdom.style(css.toString());
    vdom.div({ class: css.locals.helloContainer }, () => {
      vdom.div({ class: css.locals.blackBox, onclick: animateRegularDomBox, id: 'box1' }, 'Bounce');
    });
  },
});
