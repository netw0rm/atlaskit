/* eslint no-param-reassign: ["error", { "props": false }] */
import css from './index.less';
import dynamics from 'dynamics.js';
import { define, prop, vdom } from 'skatejs';
import objectAssign from 'object-assign';

function startAnimating(elem) {
  dynamics.animate(elem.styles, {
    transform: `translateY(-${elem.amount}px)`,
  }, {
    change: (changeData) => {
      // use objectAssign to make sure we get a new reference each time
      elem.styles = objectAssign({}, changeData);
    },
    duration: this.duration,
    type: dynamics.bounce,
  });
}

define('motion-bounce', {
  props: {
    amount: prop.number({
      attribute: true,
    }),
    animating: prop.boolean({
      attribute: true,
      set(elem, data) {
        if (data.newValue) {
          elem.animate();
        }
      },
    }),
    animateOn: prop.array({
      attribute: true,
    }),
    duration: prop.number({
      attribute: true,
    }),
    styles: {
      default() {
        return {
          cursor: 'pointer',
          transform: 'translateY(0px)',
          zIndex: 0,
        };
      },
      render() {
        return true;
      },
    },
  },
  prototype: {
    animate() {
      startAnimating(this);
    },
  },
  render(elem) {
    const divAttrs = {
      class: css.locals.testing,
      style: elem.styles,
    };

    elem.animateOn.forEach(on => (
      divAttrs[`on${on}`] = function startAnimatingOn() {
        startAnimating(elem);
      }
    ));
    vdom.style(css.toString());
    vdom.div(divAttrs, () => {
      vdom.create('slot');
    });
  },
});

export default define('x-hello', {
  props: {
    name: { attribute: true },
    speed: prop.number(),
  },
  render() {
    vdom.create('motion-bounce', { animateOn: ['click'], amount: 100, duration: 1000 }, () => {
      vdom.div('Test 1');
    });
    vdom.create('motion-bounce', { amount: 50, animating: true, duration: 2000 }, () => {
      vdom.div('Test 2');
    });
  },
});
