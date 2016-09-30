import { vdom, define, prop } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import Select from './block-type-select';
import Option from './option';

export default define('ak-editor-toolbar-block-type', {
  created(elem) {
    elem.closeBlockTypeDropdown = elem.closeBlockTypeDropdown.bind(elem);
    elem.toggleDropDown = elem.toggleDropDown.bind(elem);
  },
  attached(elem) {
    document.addEventListener('click', elem.closeBlockTypeDropdown, true);
  },
  detached(elem) {
    document.removeEventListener('click', elem.closeBlockTypeDropdown, true);
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
          onToggleDropdown={elem.toggleDropDown}
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
      this.wasOpen = this.dropdownOpen;
      this.dropdownOpen = false;
    },
    toggleDropDown() {
      if (this.disabled || this.dropdownOpen || this.wasOpen) {
        this.closeBlockTypeDropdown();
        return;
      }

      this.dropdownOpen = true;
    },
  },
  props: {
    dropdownOpen: prop.boolean({ attribute: true }),
    selectedBlockType: { attribute: true },
    blockTypes: prop.array({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
  },
});
