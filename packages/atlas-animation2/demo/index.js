import demoHTML from './index.html'; // eslint-disable-line no-unused-vars
import {atlasBounce, atlasPulse} from '../src/index.js'; // eslint-disable-line no-unused-vars

import { skate, prop, vdom } from 'skatejs';
import css from './index.less';

const animateBounce = atlasBounce({}); //create a atlasBounce function with the default options
const animatePulse = atlasPulse({});

function animateRegularDomBox() {
  const box = document.getElementById('box2');
  animateBounce(function step(style) {
    Object.assign(box.style, style);
  });
}

skate('bounce-box', {
  properties: {
    amount: prop.number({
      attribute: true
    }),

    styles: {
      default() {
        return {};
      }
    }
  },
  events: {
    click(elem) {
      animateBounce(function step(style) {
        elem.styles = Object.assign({}, style);
      }, function done(){
        animatePulse(function step(style) {
          elem.styles = Object.assign({}, style);
        });
      });
    }
  },

  render (elem) {
    const divAttrs = {
      class: css.locals.blackBox,
      style: elem.styles
    };

    vdom.style(css.toString());
    vdom.div(divAttrs, 'A custom component');
  }
});

export default skate('x-hello', {
  properties: {
    name: { attribute: true },
    speed: prop.number()
  },
  render () {
    vdom.style(css.toString());
    vdom.div({class: css.locals.helloContainer}, function(){
      vdom.div({class: css.locals.blackBox, onclick: animateRegularDomBox, id: 'box1'}, 'Bounce');
    });
  }
});
