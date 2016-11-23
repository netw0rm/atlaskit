/** @jsx vdom */

import { vdom } from 'skatejs';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <div {...props}>
    <style>{shadowStyles.toString()}</style>
    <div className={shadowStyles.locals.container}>
      {children()}
    </div>
  </div>
);
