import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

export default (props, children) => (
  <span
    className={shadowStyles.locals.chrome}
    {...props}
  >
      {children()}
  </span>
);
