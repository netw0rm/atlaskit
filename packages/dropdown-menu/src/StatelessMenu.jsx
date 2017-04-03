import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import Button from '@atlaskit/button';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import uid from 'uid';
import styles from 'style!./styles.less';

const Icon = <ExpandIcon label="" />;

/* eslint-disable react/no-unused-prop-types */
export default class StatelessDropdownMenu extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall', 'manual']),
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    isTriggerNotTabbable: PropTypes.bool,
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onItemActivated: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    triggerType: PropTypes.oneOf(['default', 'button']),
    triggerButtonProps: PropTypes.shape(Button.propTypes),
    shouldFlip: PropTypes.bool,
    manualMaxHeight: PropTypes.number,
  }

  static defaultProps = {
    appearance: 'default',
    isOpen: false,
    isTriggerNotTabbable: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    triggerType: 'default',
    triggerButtonProps: {},
    shouldFlip: true,
  }

  state = {
    id: uid(),
  }

  componentDidMount = () => {
    if (this.domItemsList) {
      this.focusFirstItem();
    }
  }

  componentDidUpdate = (prevProp) => {
    if (this.props.isOpen && !prevProp.isOpen) {
      this.focusFirstItem();
    }
  }

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

  isTargetChildItem = target => target && (target.getAttribute('data-role') === 'droplistItem') &&
    ReactDOM.findDOMNode(this).contains(target) // eslint-disable-line react/no-find-dom-node

  handleKeyboardInteractions = (event) => {
    if (this.props.isOpen) {
      if (this.isTargetChildItem(event.target)) {
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
          default:
            break;
        }
      } else if (event.key === 'ArrowDown') {
        this.sourceOfIsOpen = 'keydown';
        this.focusFirstItem();
      } else if (event.key === 'Tab') {
        this.close({ event });
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

  open = (attrs) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true, event: attrs.event });
  }

  close = (attrs) => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  }

  toggle = (attrs) => {
    if (attrs.source === 'keydown') return;

    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  }

  renderItems = items => items.map((item, itemIndex) =>
    <Item
      {...item}
      key={itemIndex}
      onActivate={() => {
        this.props.onItemActivated({ item });
      }}
    >
      {item.content}
    </Item>
  )

  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group heading={group.heading} key={groupIndex}>{this.renderItems(group.items)}</Group>
  )

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
        onOpenChange={props.onOpenChange}
        position={props.position}
        shouldFlip={props.shouldFlip}
        trigger={this.renderTrigger()}
        manualMaxHeight={props.manualMaxHeight}
      >
        <div
          id={state.id}
          ref={(ref) => {
            this.domMenuContainer = ref;
            this.domItemsList = ref ? ref.querySelectorAll('[data-role="droplistItem"]') : undefined;
          }}
          role="menu"
          className={styles.menuContainer}
        >
          {this.renderGroups(props.items)}
        </div>
      </Droplist>
    );
  }
}
