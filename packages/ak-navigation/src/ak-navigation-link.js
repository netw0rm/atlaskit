/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './ak-navigation-link.less';
import classNames from 'classnames';

const enterKeyCode = 13;

function select(elem) {
  emit(elem, 'ak-navigation-link-selected');
}

export default define('ak-navigation-link', {
  created(elem) {
    elem.addEventListener('click', () => select(elem));
    elem.addEventListener('keyup', (event) => {
      if (event.keyCode === enterKeyCode) {
        select(elem);
      }
    });
  },
  render(elem) {
    return (
      <div
        className={classNames(
        shadowStyles.locals.link, {
          [shadowStyles.locals.selected]: elem.selected,
        })}
      >
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.icon}>
          <slot name="icon" />
        </div>
        <a
          className={shadowStyles.locals.text}
          href={elem.href}
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
