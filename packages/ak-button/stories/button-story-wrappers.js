import Adg2Theme from '../src/themes/adg2';
import { define, vdom, props } from 'skatejs';
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
    elem.querySelectorAll('ak-button').forEach(button => {
      props(button, { themeName: 'ak-button-adg2' });
    });
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
