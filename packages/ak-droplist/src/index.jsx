import React, { PureComponent, PropTypes } from 'react';
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
 * @class Droplist
 */
export default class DropdownList extends PureComponent {
  static propTypes = {
    /**
     * @description Controls the appearance of the dropdown. Available types: 'default', 'tall'.
     * Default dropdown has scroll after its height exceeds the pre-defined amount. Tall dropdown
     * has no restrictions.
     * @memberof Droplist
     * @default default
     */
    appearance: PropTypes.oneOf(['default', 'tall']),
    /**
     * @description Position of the menu. See the documentation of ak-layer for more details.
     * @memberof Droplist
     * @default bottom left
     */
    position: PropTypes.string,
    /**
     * @description Controls whether trigger is tabbable
     * @memberof Droplist
     * @default false
     */
    triggerIsNotTabbable: PropTypes.bool,
    /**
     * @description Whether the dropdown should be open by default
     * @memberof Droplist
     * @default []
     */
    isOpen: PropTypes.bool,
    /**
     * @description Handler function to be called when the item is activated.
     * @memberof Droplist
     */
    onItemActivated: PropTypes.func,
    /**
     * @description Handler function to be called when the menu is opened/closed.
     * @memberof Droplist
     */
    onOpenChange: PropTypes.func,
    /**
     * @description Context in which the droplist is used. This affects accessibility.
     * Available options: ['menu']
     * @default 'menu'
     * @memberof Droplist
     */
    context: PropTypes.oneOf(['menu']),
    children: PropTypes.node,
  }

  static defaultProps = {
    appearance: 'default',
    position: 'bottom left',
    isOpen: false,
    triggerIsNotTabbable: false,
    context: 'menu',
    onItemActivated: () => {},
    onOpenChange: () => {},
    children: null,
  }

  componentDidMount = () => {
    if (this.domItemsList) {
      this.focusFirstItem();
    }
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate = () => {
    if (this.props.isOpen) {
      this.focusFirstItem();
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  setMaxHeight = (dropDomRef) => {
    const { appearance } = this.props;
    dropDomRef.style.maxHeight = appearance !== 'tall' ? `${dropdownMaxHeight}px` : 'none';
  }

  focusFirstItem = () => {
    if (this.isOpenSource === 'keydown') {
      this.focusItem(0);
    }
  }

  focusNextItem = () => {
    let currentItem = this.focusedItem;
    if (currentItem < this.domItemsList.length - 1) {
      currentItem++;
    } else {
      currentItem = this.domItemsList.length - 1;
    }

    this.focusItem(currentItem);
  }

  focusPreviousItem = () => {
    let currentItem = this.focusedItem;
    if (currentItem > 0) {
      currentItem--;
    } else {
      currentItem = 0;
    }

    this.focusItem(currentItem);
  }

  focusItem = (index) => {
    this.focusedItem = index;
    this.domItemsList[this.focusedItem].focus();
  }

  handleKeyDown = (e) => {
    if (e.keyCode === keyCode('escape')) {
      this.close();
    }
  }

  handleClickOutside = (e) => {
    if (this.props.isOpen) {
      const domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
      if (!domNode || (e.target instanceof Node && !domNode.contains(e.target))) {
        this.close();
      }
    }
  }

  handleItemActivation = (item) => {
    this.props.onItemActivated({ item });
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
        this.close();
        break;
      default:
        break;
    }
  }

  handleTriggerActivation = (e) => {
    this.toggle({ source: e.source });
  }

  open = (attrs) => {
    this.isOpenSource = attrs.source;
    this.props.onOpenChange({ isOpen: true });
  }

  close = () => {
    this.isOpenSource = null;
    this.props.onOpenChange({ isOpen: false });
  }

  toggle = (attrs) => {
    if (this.props.isOpen) {
      this.close();
    } else {
      this.open(attrs);
    }
  }

  renderItems = group => group.items.map((item, itemIndex) =>
    <Item
      {...item}
      key={itemIndex}
      onActivate={() => {
        this.handleItemActivation(item);
      }}
      onKeyDown={this.handleAccessibility}
    >
      {item.content}
    </Item>
  )

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group heading={group.heading} key={groupIndex}>{this.renderItems(group)}</Group>
  )

  render = () => {
    const { props } = this;
    return (
      <div className={styles.dropWrapper}>
        <Layer
          position={props.position}
          offset="0 4"
          content={props.isOpen ?
            <div
              className={styles.dropContent}
              ref={(ref) => {
                if (ref) {
                  this.domItemsList = ref.querySelectorAll('[data-role="droplistItem"]');
                  this.setMaxHeight(ref);
                }
              }}
              role="menu"
            >
              {this.renderGroups(props.items)}
            </div> :
            null
          }
        >
          <div className={styles.dropTrigger}>
            <Trigger
              isNotTabbable={props.triggerIsNotTabbable}
              isOpened={props.isOpen}
              onActivate={this.handleTriggerActivation}
            >{props.children}</Trigger>
          </div>
        </Layer>
      </div>
    );
  }
}
