import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

import X from './X';

const button = (props) => (
  <button
    className={shadowStyles.locals.button}
    aria-label={props.text}
  >
    <X />
  </button>
);
button.propTypes = {
  text: null,
};
export default button;
