import { vdom, define, prop, emit } from 'skatejs';
import classnames from 'classnames';
import styles from './font-select.less';
import 'ak-layer';
import 'editor-button';

export default define('editorkit-font-select', {
  render(elem) {
    const style = {
      display: elem.open ? 'block' : 'none',
    };

    const className = styles.locals.fontSelect;

    return (
      <div>
        <style>{styles.toString()}</style>
        <editor-button onclick={() => emit(elem, 'toggleDropdown')} className={className}>
          <span className={styles.locals.buttonSpan}>{elem.selectedReadableName}</span>
        </editor-button>
        <ak-layer target={`.${className}`} position="bottom center" style={style} open={elem.open}>
          <slot></slot>
        </ak-layer>
      </div>
    );
  },
  props: {
    open: prop.boolean({ attribute: true }),
    selectedReadableName: prop.string({ attribute: true })
  }
});
