import css from './index.less';
import { skate, prop, vdom } from 'skatejs';

skate('motion-scale', {
  properties: {
    amount: prop.number(),
    hovering: prop.boolean(),
    speed: prop.number()
  },
  render (elem) {
    const style = {
      cursor: 'pointer',
      transition: `transform ${3 * elem.speed}ms`,
      transformOrigin: 'left',
      zIndex: 0
    };

    if (elem.hovering) {
      style.transform = `scale(${elem.amount || '1'})`;
      style.zIndex = 1;
    }

    vdom.style(css.toString());
    vdom.div({
      class: css.locals.testing,
      onmouseover: () => elem.hovering = true,
      onmouseout: () => elem.hovering = false,
      style
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
    vdom('motion-scale', { amount: 2, speed: 100 }, function () {
      vdom.div('Test 1');
    });
    vdom('motion-scale', { amount: 1.2, speed: 200 }, function () {
      vdom.div('Test 2');
    });
  }
});
