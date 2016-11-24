/** @jsx vdom */

import { vdom } from 'skatejs';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <a
    {...props}
    tabIndex="-1"
    className={shadowStyles.locals.href}
    href={props.href}
  >
    {children()}
  </a>
);
