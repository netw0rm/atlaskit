// import styles from './index.less';
import { skate, state, prop, vdom } from 'skatejs';
import jss from 'jss';
import jssNested from 'jss-nested';

jss.use(jssNested());

function styles (fn) {
  return function (props) {
    const idom = vdom.IncrementalDOM;
    let currentElement;

    vdom.span(function () {
      currentElement = idom.currentElement();
      const userStyle = fn(props);
      const cache = currentElement.__cache || (currentElement.__cache = currentElement.__cache = jss.createStyleSheet(userStyle, { link: true }));
      const userStyleKeys = Object.keys(userStyle);

      // patch rules
      userStyleKeys.forEach(function (userStyleKey) {
        const existingRule = cache.getRule(userStyleKey);
        const newRule = userStyle[userStyleKey];
        const newRuleKeys = Object.keys(newRule);

        if (existingRule) {
          const existingRuleKeys = Object.keys(existingRule.style);

          // Remove all existing properties that aren't in the new properties.
          existingRuleKeys.forEach(function (existingRuleKey) {
            if (newRuleKeys.indexOf(existingRuleKey) === -1) {
              existingRule.prop(existingRuleKey, null);
            }
          });

          // Set all new properties.
          newRuleKeys.forEach(function (newRuleKey) {
            existingRule.prop(newRuleKey, newRule[newRuleKey]);
          });
        } else {
          cache.addRule(userStyleKey, newRule);
        }
      });

      if (!currentElement.hasChildNodes()) {
        cache.renderer.head = currentElement;
        cache.renderer.attach();
      }
      cache.deploy();
      idom.skip();
    });

    return currentElement.__cache.classes;
  };
}

const css = styles(function (props) {
  return {
    testing: {
      'transition': `transform ${3 * props.speed}ms`,
      'transform-origin': 'left',
      '&:hover': {
        'transform': `scale(${props.amount || '1'})`
      }
    }
  };
});

skate('motion-pulse', {
  properties: {
    amount: prop.number(),
    speed: prop.number()
  },
  render (elem) {
    const classes = css(state(elem));
    vdom.div({ class: classes.testing }, function () {
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
    vdom('motion-pulse', { amount: 1.3, speed: 100 }, function () {
      vdom.div('testing');
    });
    vdom('motion-pulse', { amount: 1.2, speed: 200 }, function () {
      vdom.div('testing');
    });
  }
});
