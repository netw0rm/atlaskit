/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { prop, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

const definition = {
  render(elem) {
    return (
      // JSX requires that there only be a single root element.
      // Incremental DOM doesn't require this.
      <div>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.containerName}>
          <a href={elem.link}>
            <img className={shadowStyles.locals.logo} alt={elem.name} src={elem.logo} />
          </a>
          <span>{elem.name}</span>
        </div>
        <div className={shadowStyles.locals.containerLinks}>
          <slot />
        </div>
      </div>
    );
  },
  props: {
    name: prop.string({
      attribute: true,
    }),
    logo: prop.string({
      attribute: true,
    }),
    href: prop.string({
      attribute: true,
    }),
  },
  events: {
    'ak-navigation-link-selected': (elem, event) => {
      Array.prototype.slice.call(elem.children).forEach((child) => { child.selected = false; });
      event.target.selected = true;
    },
  },
};

export default define('ak-navigation-container', definition);
