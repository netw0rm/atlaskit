/** @jsx vdom */

import { vdom, prop, define } from 'skatejs';

import shadowGroupStyles from './less/shadow-group.less';

export default define('ak-dropdown-group', {
  render(elem) {
    return (
      <div
        className={shadowGroupStyles.locals.group}
        role="group"
        aria-label={elem.heading}
      >
        <style>{shadowGroupStyles.toString()}</style>
        {elem.heading ?
          <div
            className={shadowGroupStyles.locals.heading}
            aria-hidden="true"
          >
            {elem.heading}
          </div> : null}
        <slot />
      </div>
    );
  },
  props: {
    heading: prop.string({
      attribute: true,
    }),
  },
});
