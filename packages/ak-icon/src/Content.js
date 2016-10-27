import { vdom } from 'skatejs';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <span className={shadowStyles.locals.content}>
    {children()}
  </span>
);
