import { vdom, define, prop, emit } from 'skatejs';
import styles from './block-type-select.less';
import Button from 'ak-editor-button';

export default define('ak-editor-toolbar-block-type-select', {
  render(elem) {
    return (
      <div>
        <style>{styles.toString()}</style>
        <Button
          disabled={elem.disabled}
          onClick={() => emit(elem, 'toggleDropdown')}
          className={styles.locals.blockTypeSelect}
          active={elem.active}
        >
          <span className={styles.locals.buttonSpan}>{elem.selectedReadableName}</span>
        </Button>
        <slot />
      </div>
    );
  },
  props: {
    selectedReadableName: prop.string({ attribute: true }),
    active: prop.boolean({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
  },
});
