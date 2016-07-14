import { vdom, define, prop, emit } from 'skatejs';
import styles from './overlay.less';

export default define('editorkit-overlay', {
  render(elem) {
    const style = {
      display: elem.open ? 'block' : 'none'
    };

    return (
      <div>
        <style>{styles.toString()}</style>
        <div className={styles.locals.overlay} style={style} onclick={ _ => {

          emit(elem.parentNode, 'toggleDropdown')
        } }></div>
      </div>
    );
  }
});
