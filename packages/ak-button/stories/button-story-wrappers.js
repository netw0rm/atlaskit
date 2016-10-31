import { define, vdom, props } from 'skatejs';

import { themes } from '../src';


const Adg2Theme = themes.adg2;
const { element } = vdom;

export const DefaultWrapper = define('default-wrapper', {
  render() {
    return (
      element('div', () =>
        element('slot')
      )
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
        element(Adg2Theme);
        element('slot');
      })
    );
  },
});
