import { vdom, define, prop, emit } from 'skatejs';
import styles from './font-select.less';
import Button from 'editor-button';

export default define('editorkit-font-select', {
  render(elem) {
    const style = {
      display: elem.open ? 'block' : 'none',
    };

    const className = styles.locals.fontSelect;

    return (
      <div>
        <style>{styles.toString()}</style>
        <Button onclick={() => emit(elem, 'toggleDropdown')} className={className}>
          <span className={styles.locals.buttonSpan}>{elem.selectedReadableName}</span>
        </Button>
        <slot style={style} />
      </div>
    );
  },
  props: {
    open: prop.boolean({ attribute: true }),
    selectedReadableName: prop.string({ attribute: true }),
  },
});
