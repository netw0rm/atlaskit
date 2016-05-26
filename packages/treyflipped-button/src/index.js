import css from './index.less';
import dynamics from 'dynamics.js';
import { skate, prop, vdom } from 'skatejs';
import objectAssign from 'object-assign';


skate('motion-bounce', {
  properties: {
    amount: prop.number(),
    duration: prop.number(),
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
  render (elem) {
    vdom.style(css.toString());
    vdom.div({
      class: css.locals.testing,
      onclick: () => {
        dynamics.animate(elem.styles, {
          'transform': `translateY(-${elem.amount}px)`
        }, 
          {
            change: (changeData) => {
              //use objectAssign to make sure we get a new reference each time
              elem.styles = objectAssign({}, changeData);
            },
            duration: elem.duration,
            type: dynamics.bounce
          });
      },
      style: elem.styles
    }, function () {
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
    vdom('motion-bounce', { amount: 100, duration: 1000 }, function () {
      vdom.div('Test 1');
    });
    vdom('motion-bounce', { amount: 50, duration: 2000 }, function () {
      vdom.div('Test 2');
    });
  }
});
