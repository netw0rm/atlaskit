import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import Layer from 'ak-layer';
import Group from 'ak-droplist-group';
import Trigger from 'ak-droplist-trigger';
import Item from 'ak-droplist-item';
import keyCode from 'keycode';

import getAvailablePreviousItem from './internal/getAvailablePreviousItem';
import getAvailableNextItem from './internal/getAvailableNextItem';

const halfGrid = 4;
const itemHeight = halfGrid * 7;
const dropdownMaxHeight = (itemHeight * 9.5) + (halfGrid * 2); // ( item height * 9.5 items)

const getCurrentlyFocusedItem = (items, currentFocus) =>
  items[currentFocus.group].items[currentFocus.item];

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is a basic building block of a dropdown's list.
 * @class DropdownMenu
 */
export default class DropdownMenu extends Component {
  static propTypes = {
    /**
     * @description Controls the appearance of the dropdown. Available types: 'default', 'tall'.
     * Default dropdown has scroll after its height exceeds the pre-defined amount. Tall dropdown
     * has no restrictions.
     * @memberof DropdownMenu
     * @default default
     */
    appearance: PropTypes.oneOf(['default', 'tall']),
    /**
     * @description Position of the menu. See the documentation of ak-layer for more details.
     * @memberof DropdownMenu
     * @default bottom left
     */
    position: PropTypes.string,
    /**
     * @description Types of the menu's built-in trigger. Available types: 'default', 'button'.
     * @memberof DropdownMenu
     * @default default
     */
    triggerType: PropTypes.oneOf(['default', 'button']),
    /**
     * @description List of menu items. Should be an array of groups (see the documentation for
     * ak-droplist-group for available props). Every group should contain array of items
     * (see the documentation for ak-droplist-item for available props).
     * @memberof DropdownMenu
     * @example @js [
     *    {
     *        heading: 'Title of a group',
     *        items: [
     *          { content: 'First item in the group' },
     *          { content: 'Second item in the group' }
     *        ]
     *    }
     * ]
     */
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    /**
     * @description Whether the dropdown should be open by default
     * @memberof DropdownMenu
     * @default []
     */
    defaultOpen: PropTypes.bool,
    /**
     * @description  Handler function to be called when the item is activated.
     * @memberof DropdownMenu
     */
    onItemActivated: PropTypes.func,
    /**
     * @description  Handler function to be called when the menu is opened/closed.
     * @memberof DropdownMenu
     */
    onOpenChange: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    appearance: 'default',
    position: 'bottom left',
    triggerType: 'default',
    items: [],
    defaultOpen: false,
    onItemActivated: () => {},
    onOpenChange: () => {},
  }

  state = {
    isOpen: this.props.defaultOpen,
    items: this.props.items,
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  setMaxHeight = (dropDomRef) => {
    if (dropDomRef) {
      const { appearance } = this.props;
      dropDomRef.style.maxHeight = appearance !== 'tall' ? `${dropdownMaxHeight}px` : 'none';
    }
  }

  handleKeyDown = (e) => {
    if (e.keyCode === keyCode('escape')) {
      this.close({ source: 'keydown' });
    }
  }

  handleClickOutside = (e) => {
    if (this.state.isOpen) {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
        this.close({ source: 'click' });
      }
    }
  }

  handleTriggerActivation = (e) => {
    this.toggle({ source: e.source });
  }

  focusFirstItem = () => {
    this.setState({
      isTriggerFocused: false,
    });

    this.changeFocus(getAvailableNextItem(this.state.items));
  }

  removeFocusFromItems = () => {
    if (this.currentFocus) {
      const items = [...this.state.items];
      const item = getCurrentlyFocusedItem(items, this.currentFocus);
      item.isFocused = false;
      this.setState({ items });
      this.currentFocus = null;
    }
  }

  handleItemActivation = (attrs) => {
    this.props.onItemActivated({ item: attrs.item });
    this.close({ source: attrs.event.type });
  }

  handleAccessibility = (attrs) => {
    const event = attrs.event;
    event.preventDefault();

    switch (event.keyCode) {
      case keyCode('up'):
        this.focusPreviousItem();
        break;
      case keyCode('down'):
        this.focusNextItem();
        break;
      case keyCode('tab'):
        this.close({ source: 'keydown' });
        break;
      default:
        break;
    }
  }

  focusPreviousItem = () => {
    if (this.currentFocus) {
      this.changeFocus(getAvailablePreviousItem(this.state.items, this.currentFocus));
    }
  }

  focusNextItem = () => {
    if (this.currentFocus) {
      this.changeFocus(getAvailableNextItem(this.state.items, this.currentFocus));
    }
  }

  changeFocus = (newFocusData) => {
    const { group: newGroupFocus, item: newItemFocus } = newFocusData;
    const items = [...this.state.items];

    // if we have a previously focused item, then it should be un-focused
    if (this.currentFocus) {
      const item = getCurrentlyFocusedItem(items, this.currentFocus);
      item.isFocused = false;
    }

    items[newGroupFocus].items[newItemFocus].isFocused = true;
    this.currentFocus = { group: newGroupFocus, item: newItemFocus };
    this.setState({ items });
  }

  open = (attrs) => {
    if (attrs.source === 'keydown') {
      this.focusFirstItem();
    }
    if (this.state.isTriggerFocused) {
      this.setState({
        isTriggerFocused: false,
      });
    }
    this.setState({ isOpen: true });
    this.props.onOpenChange({ isOpen: true });
  }

  close = (attrs) => {
    this.setState({ isOpen: false });
    this.props.onOpenChange({ isOpen: false });

    if (attrs.source && attrs.source === 'keydown') {
      this.setState({
        isTriggerFocused: true,
      });
      this.removeFocusFromItems();
    }
  }

  toggle = (attrs) => {
    if (this.state.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  }

  renderSubComponents = (groups) => { // eslint-disable-line arrow-body-style
    return groups.map((group, groupIndex) => {
      const items = group.items.map((item, itemIndex) => { // eslint-disable-line arrow-body-style
        return (
          <Item
            key={itemIndex}
            href={item.href}
            target={item.target}
            type={item.type}
            isActive={item.isActive}
            isDisabled={item.isDisabled}
            isFocused={item.isFocused}
            isHidden={item.isHidden}
            isChecked={item.isChecked}
            elemBefore={item.elemBefore}
            onActivate={this.handleItemActivation}
            onKeyDown={this.handleAccessibility}
          >
            {item.content}
          </Item>
        );
      });
      return <Group heading={group.heading} key={groupIndex}>{items}</Group>;
    });
  }

  render = () => {
    const { props, state } = this;
    return (
      <div className={styles.dropWrapper}>
        <Layer
          position={props.position}
          offset="0 4"
          content={state.isOpen ?
            <div
              className={styles.dropContent}
              ref={this.setMaxHeight}
              role="menu"
            >
              {this.renderSubComponents(props.items)}
            </div> :
            null
          }
        >
          <div className={styles.dropTrigger}>
            <Trigger
              type={props.triggerType}
              isOpened={state.isOpen}
              onActivate={this.handleTriggerActivation}
              isFocused={this.state.isTriggerFocused}
            >{props.children}</Trigger>
          </div>
        </Layer>
      </div>
    );
  }
}
