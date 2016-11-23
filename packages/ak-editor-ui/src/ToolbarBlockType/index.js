/** @jsx vdom */

import { vdom, define, prop, Component } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import Select from './Select';
import Option from './Option';

// todo: we will use a common helper function when it's ready.
// https://ecosystem.atlassian.net/browse/AK-513
function isDescendantOf(child, parent) {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isDescendantOf(child.parentNode, parent);
}

export default define('ak-editor-ui-toolbar-block-type', class extends Component {
  static get props() {
    return {
      dropdownOpen: prop.boolean({ attribute: true }),
      selectedBlockType: { attribute: true },
      blockTypes: prop.array({ attribute: true }),
      disabled: prop.boolean({ attribute: true }),
    };
  }

  static created(elem) {
    elem.handleClickOutside = elem.handleClickOutside.bind(elem);
    elem.closeBlockTypeDropdown = elem.closeBlockTypeDropdown.bind(elem);
    elem.toggleDropdown = elem.toggleDropdown.bind(elem);
  }

  static attached(elem) {
    document.addEventListener('click', elem.handleClickOutside);
  }

  static detached(elem) {
    document.removeEventListener('click', elem.handleClickOutside);
  }

  static render(elem) {
    const selectedBlockType = elem.selectedBlockType || elem.blockTypes[0] || {};

    return (
      <div className={styles.locals.root}>
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
  }

  handleClickOutside(e) {
    // todo: we will use a common helper function when it's ready.
    // https://ecosystem.atlassian.net/browse/AK-513
    if (this.dropdownOpen && e.target !== this && !isDescendantOf(e.target, this) &&
      !(e.path && e.path.indexOf(this) > -1)) {
      this.closeBlockTypeDropdown();
    }
  }

  closeBlockTypeDropdown() {
    this.dropdownOpen = false;
  }

  toggleDropdown() {
    if (this.disabled) {
      return;
    }

    if (this.dropdownOpen) {
      this.closeBlockTypeDropdown();
    } else {
      this.dropdownOpen = true;
    }
  }
});
