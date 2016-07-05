import { vdom, define, state, prop } from 'skatejs';
import cx from 'classnames';
import styles from './button.less';

export default define('editorkit-toolbar-button', {
  render(elem) {
    return (
      <div className={cx(styles.locals.root, {[styles.locals.active]: elem.active})}>
        <style>{styles.toString()}</style>
        <button><slot/></button>
      </div>
    );
  },
  ready(elem) {
    const button = elem.querySelector('button');
    button.addEventListener('mouseup', _ => button.blur());
    button.addEventListener('click', _ => state(elem, {active: !elem.active}));
  },
  props: {
    active: prop.boolean({ attribute: true, default: false }),
  },
});
