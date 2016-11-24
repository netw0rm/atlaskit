/** @jsx vdom */

import { vdom, define, prop } from 'skatejs';
import classNames from 'classnames';

import shadowStyles from './ak-navigation-drawer.less';

export default define('ak-navigation-drawer', {
  render(elem) {
    return (
      <div
        className={classNames(shadowStyles.locals.drawer, {
          [shadowStyles.locals.open]: elem.open,
          [shadowStyles.locals.large]: elem.large,
        })}
      >
        <style>{shadowStyles.toString()}</style>
        <slot />
      </div>
    );
  },
  props: {
    open: prop.boolean({
      attribute: true,
    }),
    large: prop.boolean({
      attribute: true,
    }),
  },
});
