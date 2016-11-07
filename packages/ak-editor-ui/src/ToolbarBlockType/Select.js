import { vdom, define, prop, emit, Component } from 'skatejs';
import Button from '../Button';
import styles from './Select.less';

export default define('ak-editor-ui-toolbar-block-type-select', class extends Component {
  static get props() {
    return {
      selectedReadableName: prop.string({ attribute: true }),
      active: prop.boolean({ attribute: true }),
      disabled: prop.boolean({ attribute: true }),
    };
  }

  static render(elem) {
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
  }
});
