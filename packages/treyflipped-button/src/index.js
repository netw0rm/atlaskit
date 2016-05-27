import css from './index.less';
import dynamics from 'dynamics.js';
import { skate, prop, vdom } from 'skatejs';
import objectAssign from 'object-assign';


skate('motion-bounce', {
  properties: {
    amount: prop.number({
      attribute: true
    }),
    animating: prop.boolean({
      attribute: true,
      set (elem, data) {
        if (data.newValue) {
          elem.animate();
        }
      }
    }),
    animateOn: prop.array({
      attribute: true
    }),
    duration: prop.number({
      attribute: true
    }),
    styles: {
      default() {
        return {
          cursor: 'pointer',
          'transform': 'translateY(0px)',
          zIndex: 0
        };
      },
      render() {
        return true;
      }
    }
  },
  prototype: {
    animate () {
      dynamics.animate(this.styles, {
        'transform': `translateY(-${this.amount}px)`
      }, {
        change: (changeData) => {
          //use objectAssign to make sure we get a new reference each time
          this.styles = objectAssign({}, changeData);
        },
        duration: this.duration,
        type: dynamics.bounce
      });
    }
  },
  render (elem) {
    const divAttrs = {
      class: css.locals.testing,
      style: elem.styles
    };

    elem.animateOn.forEach(on => divAttrs[`on${on}`] = elem.animate.bind(elem));
    vdom.style(css.toString());
    vdom.div(divAttrs, function () {
      vdom('slot');
    });
  }
});

export default skate('x-hello', {
  properties: {
    name: { attribute: true },
    speed: prop.number()
  },
  render () {
    vdom('motion-bounce', { animateOn: ['click'], amount: 100, duration: 1000 }, function () {
      vdom.div('Test 1');
    });
    vdom('motion-bounce', { amount: 50, animating: true, duration: 2000 }, function () {
      vdom.div('Test 2');
    });
  }
});
