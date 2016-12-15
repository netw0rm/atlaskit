import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from 'style!./styles.less';
import Layer from 'ak-layer';
import Group from 'ak-droplist-group';
import Trigger from 'ak-droplist-trigger';
import Item from 'ak-droplist-item';
import keyCode from 'keycode';

const halfGrid = 4;
const itemHeight = halfGrid * 7;
const dropdownMaxHeight = (itemHeight * 9.5) + (halfGrid * 2); // ( item height * 9.5 items)

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
      this.close();
    }
  }

  handleClickOutside = (e) => {
    const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
      this.close();
    }
  }

  handleTriggerActivation = () => {
    this.toggle();
  }

  handleItemActivation = (item) => { // eslint-disable-line arrow-body-style
    return () => {
      this.props.onItemActivated({ item });
      this.close();
    };
  }

  open = () => {
    this.setState({ isOpen: true });
    this.props.onOpenChange({ isOpen: true });
  }

  close = () => {
    this.setState({ isOpen: false });
    this.props.onOpenChange({ isOpen: false });
  }

  toggle = () => {
    const isOpen = !this.state.isOpen;
    this.setState({ isOpen });
    this.props.onOpenChange({ isOpen });
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
            isHidden={item.isHidden}
            isChecked={item.isChecked}
            elemBefore={item.elemBefore}
            onActivate={this.handleItemActivation(item)}
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
              ref={ref => (this.setMaxHeight(ref))}
            >
              {this.renderSubComponents(props.items)}
            </div> :
            null
          }
        >
          <div className={styles.dropTrigger}>
            <Trigger
              type={this.props.triggerType}
              isOpened={this.state.isOpen}
              onActivate={this.handleTriggerActivation}
            >{props.children}</Trigger>
          </div>
        </Layer>
      </div>
    );
  }
}
