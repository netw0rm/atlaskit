import 'style!./host.less';

import { vdom, define, prop, emit } from 'skatejs';
import keycode from 'keycode';
import { events as dropdownEvents } from 'ak-dropdown';

function select(elem) {
  emit(elem, dropdownEvents.trigger.activated);
}

export default define('ak-navigation-global-item', {
  created(elem) {
    elem.addEventListener('click', () => select(elem));
    elem.addEventListener('keyup', (event) => {
      if (event.keyCode === keycode('enter')) {
        select(elem);
      }
    });
  },
  render() {
    return (
      <div>
        <slot />
      </div>
    );
  },
  props: {
    href: prop.string({
      attribute: true,
    }),
  },
});
