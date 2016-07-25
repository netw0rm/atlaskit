import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

export default (props, children) => (
  <span
    className={shadowStyles.locals.text}
  >
      {children()}
  </span>
);
