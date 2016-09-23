import { vdom, define, prop, emit } from 'skatejs';
import cx from 'classnames';
import styles from './index.less';
import Select from './block-type-select';
import Option from './option';

function toggle(elem) {
  if (!elem.disabled || elem.dropdownOpen) {
    elem.dropdownOpen = !elem.dropdownOpen;
  }
}

function selectBlockType(elem) {
  return (event) => {
    elem.selectedBlockType = event.detail.blockType;
    toggle(elem);

    // TODO: remove this when reactify v0.0.7 is released (https://github.com/webcomponents/react-integration/commit/53f8bf59a76b0ea0929bf2e95866ce949456eef5)
    emit(elem, 'selectblocktype', { detail: { blockType: elem.selectedBlockType } });
  };
}

export default define('ak-editor-toolbar-block-type', {
  created(elem) {
    elem.closeBlockTypeDropdown = () => { elem.dropdownOpen = false; };
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
        onSelectBlockType={selectBlockType(elem)}
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
  props: {
    dropdownOpen: prop.boolean({ attribute: true }),
    selectedBlockType: { attribute: true },
    blockTypes: prop.array({ attribute: true }),
    disabled: prop.boolean({ attribute: true }),
    context: { attribute: true, default: document },
  },
});
