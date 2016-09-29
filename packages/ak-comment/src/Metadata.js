import { vdom } from 'skatejs';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <div className={shadowStyles.locals.metadata}>
    {children()}
  </div>
);
