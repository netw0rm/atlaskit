import { vdom, define, prop, emit } from 'skatejs';
import styles from './font-select.less';
import Button from 'ak-editor-button';

export default define('ak-editor-toolbar-block-type-font-select', {
  render(elem) {
    return (
      <div>
        <style>{styles.toString()}</style>
        <Button
          disabled={elem.disabled}
          onclick={() => emit(elem, 'toggleDropdown')}
          className={styles.locals.fontSelect}
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
