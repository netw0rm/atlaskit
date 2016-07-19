/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';
import 'ak-navigation-container';
import 'ak-navigation-link';

const definition = {
  render() {
    return (
      <div className={shadowStyles.locals.navigation}>
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
};

export default define('ak-navigation', definition);
