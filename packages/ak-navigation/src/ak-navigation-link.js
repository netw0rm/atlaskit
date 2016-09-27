import 'style!./host.less';

import { vdom, define, prop, emit } from 'skatejs';
import { style } from 'akutil-common';
import shadowStyles from './ak-navigation-link.less';
import classNames from 'classnames';
import keycode from 'keycode';
import { linkSelected as linkSelectedEvent } from './internal/events';

const anchorElement = Symbol('anchor');

function select(elem) {
  emit(elem, linkSelectedEvent);
  if (elem.href) {
    elem[anchorElement].click();
  }
}


export default define('ak-navigation-link', {
  created(elem) {
    elem.addEventListener('click', () => select(elem));
    elem.addEventListener('keyup', (event) => {
      if (event.keyCode === keycode('enter')) {
        select(elem);
      }
    });
  },
  render(elem) {
    style(vdom, {
      [`.${shadowStyles.locals.icon}::slotted(*)`]: {
        display: 'inline-block',
        'margin-left': '10px', // TODO get this from ./shared-variables.less
        'margin-right': '20px', // TODO same as above
        position: 'relative',
        width: '20px',
      },
    });

    return (
      <div
        className={classNames(shadowStyles.locals.wrapper, {
          [shadowStyles.locals.selected]: elem.selected,
        })}
      >
        <style>{shadowStyles.toString()}</style>
        <slot
          name="icon"
          className={shadowStyles.locals.icon}
        />
        <a
          className={classNames(shadowStyles.locals.text, shadowStyles.locals.link)}
          href={elem.href}
          ref={(a) => { elem[anchorElement] = a; }}
          tabindex="0"
        >
          <slot />
        </a>
      </div>
    );
  },
  props: {
    href: prop.string({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
    }),
  },
});
