import { vdom } from 'skatejs';
import shadowItemStyles from '../less/shadow-item.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <div
    {...props}
    className={shadowItemStyles.locals.itemLeftPosition}
  >
    {children()}
  </div>
);
