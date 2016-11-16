import '../types';
import { define, prop } from 'skatejs';
import { BlockType, BlockTypeState } from 'ak-editor-plugin-block-type';
import cx from 'classnames';
import Component from '../component';
import styles from './index.less';
import Select from './Select';
import Option from './Option';

// typescript removes unused var if we import it :(
const { vdom } = require('skatejs');

// todo: we will use a common helper function when it's ready.
// https://ecosystem.atlassian.net/browse/AK-513
function isDescendantOf(child: Node, parent: Node): boolean {
  if (child.parentNode === parent) {
    return true;
  } else if (child.parentNode === null) {
    return false;
  }

  return isDescendantOf(child.parentNode, parent);
}

export default class ToolbarBlockType extends Component {
  // Declare JSX interface
  props: {
    plugin: BlockTypeState;
  };

  // Mirror Skate props
  plugin: BlockTypeState;
  _active: boolean;
  _dirty: number;

  _bound = false;

  static get props() {
    return {
      // JSX
      plugin: {
        set: (elem: ToolbarBlockType, data: {
          newValue?: BlockTypeState,
          oldValue?: BlockTypeState
        }) => {
          elem.ensureBound();

          const oldPlugin = data.oldValue;

          if (oldPlugin) {
            oldPlugin.unsubscribe(elem.onChange);
          }

          const newPlugin = data.newValue;

          if (newPlugin) {
            newPlugin.subscribe(elem.onChange);
          }
        }
      },

      // Private
      _active: {},
      _dirty: {}
    };
  }

  static created(elem: ToolbarBlockType) {
    elem.ensureBound();
  }

  static attached(elem: ToolbarBlockType) {
    document.addEventListener('click', elem.handleClickOutside);
  }

  static detached(elem: ToolbarBlockType) {
    document.removeEventListener('click', elem.handleClickOutside);
  }

  static render(elem: ToolbarBlockType) {
    const {
      currentBlockType,
      canChange,
      availableBlockTypes
    } = elem.plugin;

    return (
      <div>
        <style>{styles.toString()}</style>
        <Select
          disabled={!canChange}
          className={styles.locals.blockTypeSelect}
          selectedReadableName={currentBlockType.title}
          onToggleDropdown={elem.toggleDropdown}
          onSelectBlockType={elem.onSelect}
          active={elem._active}
          >
          <ul
            className={cx(styles.locals.dropdownContent, {
              [styles.locals.dropdownOpen]: elem._active,
            })}
            >
            {availableBlockTypes.map(blockType => (
              <li><Option
                blockType={blockType}
                blockTypeName={blockType.name}
                active={currentBlockType === blockType}
                >{blockType.title}</Option></li>
            ))}
          </ul>
        </Select>
      </div>
    );
  }

  private onChange(state: BlockTypeState) {
    this._dirty++;
  }

  private onSelect(event: any) {
    this.plugin.changeBlockType(event.detail.blockType.name);
    this._active = false;
  }

  private handleClickOutside(e: any) {
    // todo: we will use a common helper function when it's ready.
    // https://ecosystem.atlassian.net/browse/AK-513
    if (this._active && e.target !== this && !isDescendantOf(e.target, this) &&
      !(e.path && e.path.indexOf(this) > -1)) {
      this._active = false;
    }
  }

  toggleDropdown() {
    if (this.plugin.canChange) {
      this._active = !this._active;
    }
  }

  private ensureBound() {
    if (!this._bound) {
      this.onChange = this.onChange.bind(this);
      this.onSelect = this.onSelect.bind(this);
      this.handleClickOutside = this.handleClickOutside.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this._bound = true;
    }
  }
}

define('ak-editor-ui-toolbar-block-type', ToolbarBlockType);
