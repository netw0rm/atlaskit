import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import X from './X';


/* eslint-disable react/prop-types */
const button = (props) => (
  <button
    {...props}
    className={shadowStyles.locals.button}
    aria-label={props.text}
  >
    <X fill={props.fill} />
  </button>
);
export default button;
