import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <label {...props} className={shadowStyles.locals.label}>
    <div className={shadowStyles.locals.labelText}>{props.label}</div>
    {children()}
  </label>
);
