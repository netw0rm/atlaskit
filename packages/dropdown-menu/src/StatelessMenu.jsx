import React, { PureComponent, PropTypes } from 'react';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import Button from '@atlaskit/button';
import FieldBase from '@atlaskit/field-base';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import SearchIcon from '@atlaskit/icon/glyph/search';
import uid from 'uid';
import styles from './styles.less';

const Icon = <ExpandIcon label="" />;

/* eslint-disable react/no-unused-prop-types */
export default class StatelessDropdownMenu extends PureComponent {
  static propTypes = {
    /**
      * Controls the appearance of the menu.
      * Default menu has scroll after its height exceeds the pre-defined amount.
      * Tall menu has no restrictions.
      */
    appearance: PropTypes.oneOf(['default', 'tall']),
    /** Content that will be rendered inside the trigger element */
    children: PropTypes.node,
    /**
      * Controls whether to show a FieldText
      * for filtering items
      */
    hasItemsFilter: PropTypes.bool,
    /** Controls the open state of the dropdown */
    isOpen: PropTypes.bool,
    /** Controls whether it is possible to tab to the trigger.
      * This should be true if some interactive element is used inside trigger (links, buttons).
      */
    isTriggerNotTabbable: PropTypes.bool,
    /** List of items.
      * Should be an array of groups (see @atlastkit/droplist-group for available props).
      * Every group must contain array of items (see @atlastkit/droplist-item for available props).
      */
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    /**
      * The current value of the items filter.
      * The consumer is responsible for keeping this value in sync
      * using the onItemsFilterChange event
      */
    itemsFilterValue: PropTypes.string,
    /** Called when an item is activated. Receives an object with the activated item */
    onItemActivated: PropTypes.func,
    /** Called when the items filter value change. Receives the filter's new value.
      * Should be used by the consumer to keep itemsFilterValue in sync*/
    onItemsFilterChange: PropTypes.func,
    /** Called when the menu should be open/closed. Received an object with isOpen state */
    onOpenChange: PropTypes.func,
    /** Position of the menu. See the documentation of @atlastkit/layer for more details */
    position: PropTypes.string,
    /** Types of the menu's built-in trigger.
      * default trigger is empty.
      * button trigger uses the Button component with the 'expand' icon.
      */
    triggerType: PropTypes.oneOf(['default', 'button']),
    /** Props to pass through to the trigger button. see @atlaskit/button for options */
    triggerButtonProps: PropTypes.shape(Button.propTypes),
    /** Flip its position to the opposite side of its target if it does not fit */
    shouldFlip: PropTypes.bool,
    /** Option to fit dropdown menu width to its parent width */
    shouldFitContainer: PropTypes.bool,
    /** Option to display multiline items when content is too long.
      * Instead of ellipsing the overflown text it causes item to flow over multiple lines.
      */
    shouldAllowMultilineItems: PropTypes.bool,
  }

  static defaultProps = {
    appearance: 'default',
    isOpen: false,
    isTriggerNotTabbable: false,
    items: [],
    itemsFilterValue: '',
    onItemActivated: () => {
    },
    onItemsFilterChange: () => {
    },
    onOpenChange: () => {
    },
    position: 'bottom left',
    triggerType: 'default',
    triggerButtonProps: {},
    shouldFlip: true,
    shouldFitContainer: false,
    shouldAllowMultilineItems: false,
  }

  state = {
    id: uid(),
    focusedItem: undefined,
  }

  componentDidMount = () => {
    if (this.domItemsList) {
      this.focusFirstItem();
    }
  }

  componentDidUpdate = (prevProp) => {
    if (this.props.isOpen && !prevProp.isOpen) {
      if (this.itemsFilterInputNode) {
        this.itemsFilterInputNode.focus();
      }
      this.focusFirstItem();
    }
  }

  onOpenChange = ({ isOpen, event }) => {
    if (!isOpen) {
      this.setState({ focusedItem: undefined });
    }
    this.props.onOpenChange({ isOpen, event });
  }

  onItemsFilterFocus = () => this.itemsFilterInputNode.focus();

  getNextFocusable = (indexItem, available) => {
    let currentItem = indexItem === undefined ? -1 : indexItem;
    const latestAvailable = available === undefined ? currentItem : available;

    if (currentItem < this.domItemsList.length - 1) {
      currentItem++;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getNextFocusable(currentItem, latestAvailable);
    }

    return latestAvailable;
  }

  getPrevFocusable = (indexItem, available) => {
    let currentItem = indexItem;
    const latestAvailable = available === undefined ? currentItem : available;

    if (currentItem > 0) {
      currentItem--;

      if (this.domItemsList[currentItem].getAttribute('aria-hidden') !== 'true') {
        return currentItem;
      }

      return this.getPrevFocusable(currentItem, latestAvailable);
    }

    return latestAvailable || currentItem;
  }

  activateFocusedItems = () => {
    if (this.domItemsList && this.state.focusedItem !== undefined) {
      this.domItemsList[this.state.focusedItem].click();
    }
  };

  filterItems = (items) => {
    const value = this.props.itemsFilterValue;
    const trimmedValue = value && value.toLowerCase().trim();
    return trimmedValue ?
      items.filter(item => (item.content.toLowerCase().indexOf(trimmedValue) > -1)) :
      items;
  }

  focusFirstItem = () => {
    if (this.sourceOfIsOpen === 'keydown') {
      this.focusItem(this.getNextFocusable());
    }
  }

  focusNextItem = () => {
    this.focusItem(this.getNextFocusable(this.state.focusedItem));
  }

  focusPreviousItem = () => {
    this.focusItem(this.getPrevFocusable(this.state.focusedItem));
  }

  focusItem = (index) => {
    this.setState({ focusedItem: index });
  }

  handleKeyboardInteractions = (event) => {
    if (this.props.isOpen) {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          this.focusPreviousItem();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.focusNextItem();
          break;
        case 'Tab':
          event.preventDefault();
          this.close({ event });
          break;
        case 'Enter':
          event.preventDefault();
          this.activateFocusedItems();
          break;
        default:
          break;
      }
    } else {
      switch (event.key) {
        case 'ArrowDown':
        case ' ':
        case 'Enter':
          event.preventDefault();
          this.open({ event, source: 'keydown' });
          break;
        default:
          break;
      }
    }
  }

  handleClick = (event) => {
    const menuContainer = this.domMenuContainer;
    // checking whether click was outside of the menu container.
    if (!menuContainer || (menuContainer && !menuContainer.contains(event.target))) {
      this.toggle({ source: 'click', event });
    }
  }

  handleItemsFilterOnChange = (event) => {
    const value = event.target.value;

    if (value !== this.props.itemsFilterValue && this.props.onItemsFilterChange) {
      this.props.onItemsFilterChange(value);
    }
  }

  open = (attrs) => {
    this.sourceOfIsOpen = attrs.source;
    this.onOpenChange({ isOpen: true, event: attrs.event });
  }

  close = (attrs) => {
    this.sourceOfIsOpen = null;
    this.onOpenChange({ isOpen: false, event: attrs.event });
  }

  toggle = (attrs) => {
    if (attrs.source === 'keydown') return;

    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  }

  isItemFocused = (indexOffset, itemIndex) =>
    this.state.focusedItem === indexOffset + itemIndex;

  renderItems = (indexOffset, items) => items.map((item, itemIndex) =>
    <Item
      {...item}
      key={itemIndex}
      isFocused={this.isItemFocused(indexOffset, itemIndex)}
      onActivate={() => {
        this.props.onItemActivated({ item });
      }}
    >
      {item.content}
    </Item>
  )

  renderItemsFilter = () => (<div className={styles.menuItemsFilterContainer}>
    <FieldBase
      isFocused={this.props.isOpen}
      onFocus={this.onItemsFilterFocus}
    >
      <div className={styles.menuItemsFilter}>
        <input
          onChange={this.handleItemsFilterOnChange}
          type="text"
          value={this.props.itemsFilterValue}
          ref={(inputNode) => { this.itemsFilterInputNode = inputNode; }}
        />
      </div>
      <div className={styles.itemsFilterIcon}>
        <SearchIcon label="" />
      </div>
    </FieldBase>
  </div>);

  renderGroups = (groups) => {
    let itemsCount = 0;
    return groups.map((group, groupIndex) => {
      const filteredItems = this.filterItems(group.items);
      const renderedItems = this.renderItems(itemsCount, filteredItems);
      itemsCount += filteredItems.length;
      return <Group heading={group.heading} key={groupIndex}>{renderedItems}</Group>;
    });
  }

  renderTrigger = () => {
    if (this.props.triggerType === 'button') {
      const triggerProps = { ...this.props.triggerButtonProps };
      const defaultButtonProps = {
        isSelected: this.props.isOpen,
        ariaHaspopup: true,
        ariaExpanded: this.props.isOpen,
        ariaControls: this.state.id,
      };
      if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
        triggerProps.iconAfter = Icon;
      }
      return (
        <Button {...defaultButtonProps} {...triggerProps}>{ this.props.children }</Button>
      );
    }
    return this.props.children;
  }

  render() {
    const { props, state } = this;
    return (
      <Droplist
        appearance={props.appearance}
        isOpen={props.isOpen}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyboardInteractions}
        onOpenChange={this.onOpenChange}
        position={props.position}
        shouldFlip={props.shouldFlip}
        trigger={this.renderTrigger()}
        shouldFitContainer={this.props.shouldFitContainer}
        shouldAllowMultilineItems={this.props.shouldAllowMultilineItems}
      >
        <div
          id={state.id}
          ref={(ref) => {
            this.domMenuContainer = ref;
            this.domItemsList = ref ? ref.querySelectorAll('[data-role="droplistItem"]') : undefined;
          }}
          role="menu"
          className={this.props.shouldFitContainer
            ? styles.menuContainerWithoutLimit
            : styles.menuContainer}
        >
          {props.hasItemsFilter ? this.renderItemsFilter() : null}
          {this.renderGroups(props.items)}
        </div>
      </Droplist>
    );
  }
}
