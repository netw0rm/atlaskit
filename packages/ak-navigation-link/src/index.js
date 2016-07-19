/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define, prop } from 'skatejs';
import shadowStyles from './shadow.less';

const definition = {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <a
        className={`${shadowStyles.locals.link} ${elem.selected ? shadowStyles.locals.selected : ''}`}
        href={elem.href}
      >
        <style>{shadowStyles.toString()}</style>
        <slot />
      </a>
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
};

export default define('ak-navigation-link', definition);
