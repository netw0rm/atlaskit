import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

export default (props, children) => (
  <span className={shadowStyles.locals.root}>
    <style>{shadowStyles.toString()}</style>
    {children()}
  </span>
);
