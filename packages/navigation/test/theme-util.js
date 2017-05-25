import { PropTypes } from 'react';
import { mount, shallow } from 'enzyme';
import { populateTheme } from '../src/theme/util';
import * as presets from '../src/theme/presets';

const theme = populateTheme(presets.container);
const themeContextTypes = Object.keys(theme).reduce((prev, current) => {
  prev[current] = PropTypes.any;
  return prev;
}, {});

export const shallowWithTheme = children => shallow(children, {
  context: theme,
});

// Taken from https://github.com/styled-components/styled-components/issues/624#issuecomment-289944633
// Ideally this would not be needed and we would use WithTheme,
// but some tests rely on wrapper.setProps and this can only be done on the root.
export const mountWithTheme = (() => {
  const createBroadcast = (initialValue) => {
    let listeners = [];
    let currentValue = initialValue;

    return {
      publish(value: mixed) {
        currentValue = value;
        listeners.forEach(listener => listener(currentValue));
      },
      subscribe(listener) {
        listeners.push(listener);
        listener(currentValue);

        return () => {
          listeners = listeners.filter(item => item !== listener);
        };
      },
    };
  };
  const CHANNEL = '__styled-components__';
  const broadcast = createBroadcast(theme);

  return children => mount(children, {
    context: {
      [CHANNEL]: broadcast.subscribe,
      ...theme,
    },
    childContextTypes: {
      [CHANNEL]: broadcast.publish,
      ...themeContextTypes,
    },
  }
  );
})();

