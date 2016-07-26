import { vdom, define, prop, emit } from 'skatejs';
import styles from './index.less';

export default define('ak-editor-overlay', {
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
          onclick={() => emit(elem, 'toggleOverlay')}
        />
      </div>
    );
  },
  props: {
    open: prop.boolean({ attribute: true }),
  },
});
