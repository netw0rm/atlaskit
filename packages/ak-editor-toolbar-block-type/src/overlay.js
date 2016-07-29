import { vdom, define, prop, emit } from 'skatejs';
import styles from './overlay.less';

export default define('ak-editor-toolbar-block-type-overlay', {
  render(elem) {
    const style = {
      display: elem.open ? 'block' : 'none',
    };

    return (
      <div>
        <style>{styles.toString()}</style>
        <div
          className={styles.locals.overlay}
          style={style}
          onclick={() => emit(elem, 'toggleDropdown')}
        />
      </div>
    );
  },
  props: {
    open: prop.boolean({ attribute: true }),
  },
});
