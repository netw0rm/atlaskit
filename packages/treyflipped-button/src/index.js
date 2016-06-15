import css from './index.less';
import dynamics from 'dynamics.js';
import { define, prop, vdom } from 'skatejs';
import objectAssign from 'object-assign';


define('motion-bounce', {
  properties: {
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
      dynamics.animate(this.styles, {
        transform: `translateY(-${this.amount}px)`,
      }, {
        change: (changeData) => {
          // use objectAssign to make sure we get a new reference each time
          this.styles = objectAssign({}, changeData);
        },
        duration: this.duration,
        type: dynamics.bounce,
      });
    },
  },
  render(elem) {
    const divAttrs = {
      class: css.locals.testing,
      style: elem.styles,
    };

    elem.animateOn.forEach(on => (divAttrs[`on${on}`] = elem.animate.bind(elem)));
    vdom.style(css.toString());
    vdom.div(divAttrs, () => {
      vdom.create('slot');
    });
  },
});

export default define('x-hello', {
  properties: {
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
