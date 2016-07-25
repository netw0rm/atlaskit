import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

const href = (props, children) => (
  <a
    className={shadowStyles.locals.href}
    href={props.href}
  >
      {children()}
  </a>
);
href.propTypes = {
  href: null,
};

export default href;
