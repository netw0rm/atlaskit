import { vdom } from 'skatejs';

import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <div className={shadowStyles.locals.icon} {...props}>
    <style>{shadowStyles.toString()}</style>
    {children()}
  </div>
);
