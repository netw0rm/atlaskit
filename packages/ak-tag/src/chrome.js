import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

export default (props, children) => (
  <span
    {...props}
    className={shadowStyles.locals.chrome}
  >
      {children()}
  </span>
);
