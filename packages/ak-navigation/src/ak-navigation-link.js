/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop, emit } from 'skatejs';
import shadowStyles from './ak-navigation-link.less';

const enterKeyCode = 13;

function select(elem) {
  emit(elem, 'ak-navigation-link-selected');
}

const definition = {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <a
        className={`
        ${shadowStyles.locals.link}
        ${elem.selected ? shadowStyles.locals.selected : ''}`}
        href={elem.href}
        tabindex="0"
      >
        <style>{shadowStyles.toString()}</style>
        <slot />
      </a>
    );
  },
  events: {
    click: (elem) => select(elem),
    keyup: (elem, event) => (event.keyCode === enterKeyCode) && select(elem),
  },
  props: {
    href: prop.string({
      attribute: true,
    }),
    selected: prop.boolean({
      attribute: true,
    }),
  },
};

export default define('ak-navigation-link', definition);
