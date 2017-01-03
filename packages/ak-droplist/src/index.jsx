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
const dropdownMaxHeight = (itemHeight * 9.5) + (halfGrid * 2);

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
    isTriggerNotTabbable: PropTypes.bool,
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
    listContext: PropTypes.oneOf(['menu']),
    children: PropTypes.node,
    /**
     * @description List of items. Should be an array of groups (see the documentation for
     * ak-droplist-group for available props). Every group should contain array of items
     * (see the documentation for ak-droplist-item for available props).
     * @memberof Droplist
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
  }

  static defaultProps = {
    appearance: 'default',
    position: 'bottom left',
    isOpen: false,
    isTriggerNotTabbable: false,
    listContext: 'menu',
    onItemActivated: () => {},
    onOpenChange: () => {},
    children: null,
    items: [],
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

  getNextFocusable = (indexItem, available) => {
    let currentItem = indexItem === undefined ? -1 : indexItem;
    const latestAvailable = available || currentItem;

    if (currentItem < this.domItemsList.length - 1) {
      currentItem++;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getNextFocusable(currentItem, latestAvailable);
    }

    return latestAvailable;
  }

  getPrevFocusable = (indexItem, latestAvailable) => {
    let currentItem = indexItem;

    if (latestAvailable === undefined) {
      latestAvailable = currentItem; // eslint-disable-line no-param-reassign
    }

    if (currentItem > 0) {
      currentItem--;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getPrevFocusable(currentItem, latestAvailable);
    }

    return latestAvailable || currentItem;
  }

  focusFirstItem = () => {
    if (this.sourceOfIsOpen === 'keydown') {
      this.focusItem(this.getNextFocusable());
    }
  }

  focusNextItem = () => {
    this.focusItem(this.getNextFocusable(this.focusedItem));
  }

  focusPreviousItem = () => {
    this.focusItem(this.getPrevFocusable(this.focusedItem));
  }

  focusItem = (index) => {
    this.focusedItem = index;
    this.domItemsList[this.focusedItem].focus();
  }

  handleKeyDown = (e) => {
    if (e.keyCode === keyCode('escape')) {
      this.close();
    }

    if (this.props.isOpen && e.target.getAttribute('data-role') === 'droplistItem') {
      switch (e.keyCode) {
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

  handleTriggerActivation = (e) => {
    this.toggle({ source: e.source });
  }

  open = (attrs) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true });
  }

  close = () => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false });
  }

  toggle = (attrs) => {
    if (this.props.isOpen) {
      this.close();
    } else {
      this.open(attrs);
    }
  }

  renderItems = items => items.map((item, itemIndex) =>
    <Item
      {...item}
      key={itemIndex}
      onActivate={() => {
        this.handleItemActivation(item);
      }}
    >
      {item.content}
    </Item>
  )

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group heading={group.heading} key={groupIndex}>{this.renderItems(group.items)}</Group>
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
              isNotTabbable={props.isTriggerNotTabbable}
              isOpened={props.isOpen}
              onActivate={this.handleTriggerActivation}
            >{props.children}</Trigger>
          </div>
        </Layer>
      </div>
    );
  }
}
