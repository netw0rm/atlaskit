/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { prop, vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import 'ak-navigation-container';
import 'ak-navigation-link';

const definition = {
  render(elem) {
    return (
      <div
        className={`${shadowStyles.locals.navigation} ${elem.open ? shadowStyles.locals.open : ''}`}
      >
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.global}>
          Global
        </div>
        <div className={shadowStyles.locals.container}>
          <slot />
        </div>
      </div>
    );
  },
  props: {
    open: prop.boolean({ attribute: true, default: true }),
  },
};

export default define('ak-navigation', definition);
