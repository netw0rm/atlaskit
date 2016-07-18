import { vdom, define, state, prop } from 'skatejs';
import cx from 'classnames';
import styles from './shadow.less';

export default define('editor-button', {
  // elem.active controlled/uncontrolled?
  render(elem) {
    return (
      <div className={cx(styles.locals.root, {[styles.locals.active]: elem.active})}>
        <style>{styles.toString()}</style>
        <button disabled={elem.disabled}><slot/></button>
      </div>
    );
  },
  ready(elem) {
    const button = elem.querySelector('button');
    button.addEventListener('mouseup', _ => button.blur());
    button.addEventListener('click', _ => elem.active = !elem.active);
  },
  props: {
    active: prop.boolean({ attribute: true, default: false }),
    disabled: prop.boolean({ attribute: true, default: false }),
  },
});
