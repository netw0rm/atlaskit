import { vdom, define, prop, emit } from 'skatejs';
import styles from './font-select.less';
import Button from 'ak-editor-button';

export default define('ak-editor-toolbar-block-type-font-select', {
  render(elem) {
    return (
      <div>
        <style>{styles.toString()}</style>
        <Button
          active={elem.active}
          class={styles.locals.fontSelect}
          on-click={() => emit(elem, 'toggleDropdown')}
        >
          <span class={styles.locals.buttonSpan}>{elem.selectedReadableName}</span>
        </Button>
        <slot />
      </div>
    );
  },
  props: {
    active: prop.boolean({ attribute: true }),
    selectedReadableName: prop.string({ attribute: true }),
  },
});
