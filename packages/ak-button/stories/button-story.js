import { storiesOf } from '@kadira/storybook';
import reactify from 'akutil-react';
import { define, vdom, props } from 'skatejs';
import { style } from 'akutil-common';

import { name } from '../package.json';
import addStories from './stories';
import { themes } from '../src';

const Adg2Theme = themes.adg2;
const { element } = vdom;

const css = {
  container: {
    display: 'flex',
    'flex-direction': 'column',
    width: '50%',
  },
  '::slotted(.sample)': {
    display: 'flex',
    'justify-content': 'space-between',
    'margin-bottom': '10px',
    'align-items': 'baseline',
  },
};

export const DefaultWrapper = define('default-wrapper', {
  render() {
    return (
      element('div', () => {
        const classes = style(vdom, css);
        element('div', { className: classes.container }, () =>
          element('slot')
        );
      })
    );
  },
});

export const Adg2ThemeWrapper = define('adg-2theme-wrapper', {
  attached(elem) {
    Array.from(elem.getElementsByTagName('ak-button')).forEach(button =>
      props(button, { themeName: 'ak-button-theme-adg2' })
    );
  },
  render() {
    return (
      element('div', () => {
        const classes = style(vdom, css);
        element('div', { className: classes.container }, () => {
          element(Adg2Theme);
          element('slot');
        });
      })
    );
  },
});

addStories(storiesOf(name, module), reactify(DefaultWrapper));
addStories(storiesOf(`${name} (adg2 theme)`, module), reactify(Adg2ThemeWrapper));
