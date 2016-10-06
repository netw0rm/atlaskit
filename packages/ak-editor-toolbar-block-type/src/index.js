import { vdom, define, prop } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import Select from './block-type-select';
import Option from './option';

function isDescendantOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isDescendantOf(child.parentNode, parent);
}

export default define('ak-editor-toolbar-block-type', {
  created(elem) {
    elem.handleClickOutside = elem.handleClickOutside.bind(elem);
    elem.closeBlockTypeDropdown = elem.closeBlockTypeDropdown.bind(elem);
    elem.toggleDropdown = elem.toggleDropdown.bind(elem);
  },
  attached(elem) {
    document.addEventListener('click', elem.handleClickOutside, true);
  },
  detached(elem) {
    document.removeEventListener('click', elem.handleClickOutside, true);
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
          onToggleDropdown={elem.toggleDropdown}
          onSelectBlockType={elem.closeBlockTypeDropdown}
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
    handleClickOutside(e) {
      // todo: we will use a common helper function when it's ready.
      // https://ecosystem.atlassian.net/browse/AK-513
      if (this.dropdownOpen && e.target !== this && !isDescendantOf(e.target, this) &&
        !(e.path && e.path.indexOf(this) > -1)) {
        this.closeBlockTypeDropdown();
      }
    },
    closeBlockTypeDropdown() {
      this.dropdownOpen = false;
    },
    toggleDropdown() {
      if (!this.disabled && this.dropdownOpen) {
        this.closeBlockTypeDropdown();
      } else {
        this.dropdownOpen = true;
      }
    },
  },
  props: {
    dropdownOpen: prop.boolean({ attribute: true }),
    selectedBlockType: { attribute: true },
    blockTypes: prop.array({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
  },
});
