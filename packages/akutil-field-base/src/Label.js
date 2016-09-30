import { vdom } from 'skatejs';
import shadowStyles from './styles/Label.less';

/* eslint-disable react/prop-types */
export default (props, children) => (
  <label {...props}>
    <div className={shadowStyles.locals.labelText}>{props.label}</div>
    {children()}
  </label>
);
