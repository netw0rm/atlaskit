import { vdom } from 'skatejs';
import shadowStyles from './shadow.less';

const button = (props) => (
  <button
    className={shadowStyles.locals.button}
    aria-label={props.text}
  >
    ×
  </button>
);
button.propTypes = {
  text: null,
};
export default button;
