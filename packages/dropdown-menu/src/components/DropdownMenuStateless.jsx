import React, { PureComponent, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import uid from 'uid';

import Button from '@atlaskit/button';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import MenuContainer from '../styled/MenuContainer';

/* eslint-disable react/no-unused-prop-types */
export default class DropdownMenuStateless extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'tall']),
    children: PropTypes.node,
    isOpen: PropTypes.bool,
    isTriggerNotTabbable: PropTypes.bool,
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onItemActivated: PropTypes.func,
    onOpenChange: PropTypes.func,
    position: PropTypes.string,
    shouldFlip: PropTypes.bool,
    triggerButtonProps: PropTypes.shape(Button.propTypes),
    triggerType: PropTypes.oneOf(['default', 'button']),
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

    // eslint-disable-next-line no-unused-expressions
    this.props.isOpen ? this.close(attrs) : this.open(attrs);
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
    const { children, isOpen, triggerButtonProps, triggerType } = this.props;

    if (triggerType === 'button') {
      const triggerProps = { ...triggerButtonProps };
      const defaultButtonProps = {
        ariaControls: this.state.id,
        ariaExpanded: isOpen,
        ariaHaspopup: true,
        isSelected: isOpen,
      };
      if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
        triggerProps.iconAfter = <ExpandIcon label="" />;
      }
      return (
        <Button {...defaultButtonProps} {...triggerProps}>
          {children}
        </Button>
      );
    }

    return children;
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
      >
        <MenuContainer
          id={state.id}
          innerRef={(ref) => {
            this.domMenuContainer = ref;
            this.domItemsList = ref
              ? ref.querySelectorAll('[data-role="droplistItem"]')
              : undefined;
          }}
          role="menu"
        >
          {this.renderGroups(props.items)}
        </MenuContainer>
      </Droplist>
    );
  }
}
