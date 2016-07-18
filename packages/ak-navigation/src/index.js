/** @jsx vdom */
import 'style!./host.less'; // eslint-disable-line import/no-unresolved

import { vdom, define } from 'skatejs';
import shadowStyles from './shadow.less';

const definition = {
  render(elem) {
    return (
      <div className={shadowStyles.locals.navigation}>
        <style>{shadowStyles.toString()}</style>
        <div className={shadowStyles.locals.global}>
          Global
        </div>
        <div className={shadowStyles.locals.container}>
          <p>I am an {elem.tagName} element!</p>
        </div>
      </div>
    );
  },
};

export default define('ak-navigation', definition);
