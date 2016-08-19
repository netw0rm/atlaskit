import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

import X from './X';

const AK_COLOR_N500 = '#42526E'; // @ak-color-N500

const button = (props) => (
  <button
    className={shadowStyles.locals.button}
    aria-label={props.text}
  >
    <X fill={AK_COLOR_N500} />
  </button>
);
button.propTypes = {
  text: null,
};
export default button;
