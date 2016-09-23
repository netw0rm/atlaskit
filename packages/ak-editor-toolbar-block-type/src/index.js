import { vdom, define, prop } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import Select from './block-type-select';
import Option from './option';

function toggle(elem) {
  if (!elem.disabled || elem.dropdownOpen) {
    elem.dropdownOpen = !elem.dropdownOpen;
  }
}

export default define('ak-editor-toolbar-block-type', {
  created(elem) {
    elem.closeBlockTypeDropdown = elem.closeBlockTypeDropdown.bind(elem);
  },
  attached(elem) {
    elem.context.addEventListener('click', elem.closeBlockTypeDropdown, true);
  },
  detached(elem) {
    elem.context.removeEventListener('click', elem.closeBlockTypeDropdown, true);
  },
  render(elem) {
    const selectedBlockType = elem.selectedBlockType || elem.blockTypes[0] || {};

    return (
      <div
        className={styles.locals.root}
      >
        <style>{styles.toString()}</style>
        <Select
          disabled={elem.disabled}
          className={styles.locals.blockTypeSelect}
          selectedReadableName={selectedBlockType.display}
          onToggleDropdown={() => toggle(elem)}
          active={elem.dropdownOpen}
        >
          <ul
            className={cx(styles.locals.dropdownContent, {
              [styles.locals.dropdownOpen]: elem.dropdownOpen,
            })}
          >
            {elem.blockTypes.map(blockType => (
              <li><Option
                blockType={blockType}
                blockTypeName={blockType.name}
                active={selectedBlockType === blockType}
              >{blockType.display}</Option></li>
            ))}
          </ul>
        </Select>
      </div>
    );
  },
  prototype: {
    closeBlockTypeDropdown() {
      this.dropdownOpen = false;
    },
  },
  props: {
    dropdownOpen: prop.boolean({ attribute: true }),
    selectedBlockType: { attribute: true },
    blockTypes: prop.array({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
    /**
     * @description context of where this component should be. A click handler,
     *              closeBlockTypeDropdown, is registered on the context to
     *              listen to the click event to close block type dropdown
     * @memberof BlockType
     * @instance
     * @default document
     * @type DOMElement
     * @example @js blockType.context = document;
     */
    context: { attribute: true, default: document },
  },
});
