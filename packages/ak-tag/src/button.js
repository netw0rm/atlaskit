import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';
import RemoveIcon from './remove-icon';

/* eslint-disable react/prop-types */
const button = (props) => (
  <button
    {...props}
    className={shadowStyles.locals.button}
    aria-label={props.text}
  >
    <RemoveIcon fill={props.fill} />
  </button>
);
export default button;
