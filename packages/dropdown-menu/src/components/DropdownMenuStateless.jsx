// @flow

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import uid from 'uid';
import Button from '@atlaskit/button';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import DropdownItemFocusManager from './context/DropdownItemFocusManager';
import DropdownItemSelectionCache from './context/DropdownItemSelectionCache';
import WidthConstrainer from '../styled/WidthConstrainer';
import { KEY_DOWN, KEY_SPACE, KEY_ENTER } from '../util/keys';
import type { DropdownMenuStatelessProps } from '../types';

export default class DropdownMenuStateless extends Component {
  props: DropdownMenuStatelessProps // eslint-disable-line react/sort-comp

  static defaultProps = {
    appearance: 'default',
    isLoading: false,
    isOpen: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    shouldAllowMultilineItems: false,
    shouldFitContainer: false,
    shouldFlip: true,
    triggerButtonProps: {},
    triggerType: 'default',
  }

  state = {
    id: uid(),
  }

  componentDidMount = () => {
    if (this.isUsingDeprecatedAPI()) {
      // eslint-disable-next-line no-console
      console.log('DropdownMenu.items is deprecated. Please switch to the declarative API.');

      if (this.domItemsList) {
        this.focusFirstItem();
      }
    }
  }

  // $FlowFixMe
  componentDidUpdate = (prevProp) => {
    if (this.isUsingDeprecatedAPI() && this.props.isOpen && !prevProp.isOpen) {
      this.focusFirstItem();
    }
  }

  // $FlowFixMe
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

  // $FlowFixMe
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

  domItemsList: NodeList<HTMLElement>

  triggerContainer: HTMLElement

  sourceOfIsOpen: ?string

  focusFirstItem = () => {
    if (this.sourceOfIsOpen === 'keydown') {
      this.focusItem(this.getNextFocusable());
    }
  }

  focusedItem: number

  focusNextItem = () => {
    this.focusItem(this.getNextFocusable(this.focusedItem));
  }

  focusPreviousItem = () => {
    this.focusItem(this.getPrevFocusable(this.focusedItem));
  }

  focusItem = (index: number) => {
    this.focusedItem = index;
    this.domItemsList[this.focusedItem].focus();
  }

  // $FlowFixMe
  isTargetChildItem = (target) => {
    if (!target) return false;

    const isDroplistItem = target.getAttribute('data-role') === 'droplistItem';

    // eslint-disable-next-line react/no-find-dom-node
    const thisDom = findDOMNode(this);
    return isDroplistItem && thisDom ? thisDom.contains(target) : false;
  }

  handleKeyboardInteractionForOpen = (event: KeyboardEvent) => {
    switch (event.key) {
      case KEY_DOWN:
      case KEY_SPACE:
      case KEY_ENTER:
        event.preventDefault();
        this.open({ event, source: 'keydown' });
        break;
      default:
        break;
    }
  }

  handleKeyboardInteractions = (event: KeyboardEvent) => {
    this.handleKeyboardInteractionForOpen(event);
  }

  handleKeyboardInteractionsDeprecated = (event: KeyboardEvent) => {
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
        case KEY_DOWN:
        case KEY_SPACE:
        case KEY_ENTER:
          event.preventDefault();
          this.open({ event, source: 'keydown' });
          break;
        default:
          break;
      }
    }
  }

  domMenuContainer: ?HTMLElement

  handleClickDeprecated = (event: MouseEvent) => {
    const menuContainer = this.domMenuContainer;
    // checking whether click was outside of the menu container.
    // $FlowFixMe - not flow typing existing code
    if (!menuContainer || (menuContainer && !menuContainer.contains(event.target))) {
      this.toggle({ source: 'click', event });
    }
  }

  isUsingDeprecatedAPI = () => Boolean(this.props.items.length)

  handleClick = (event: MouseEvent) => {
    if (this.isUsingDeprecatedAPI()) {
      this.handleClickDeprecated(event);
      return;
    }

    const { triggerContainer } = this;
    // $FlowFixMe - existing code that works fine but flow doesn't like for some reason
    if (triggerContainer && triggerContainer.contains(event.target)) {
      const { isOpen } = this.props;
      this.sourceOfIsOpen = 'mouse';
      this.props.onOpenChange({ isOpen: !isOpen, event });
    }
  }

  triggerContent = () => {
    const { children, trigger, isOpen, triggerButtonProps, triggerType } = this.props;
    const insideTriggerContent = this.isUsingDeprecatedAPI() ? children : trigger;

    if (triggerType !== 'button') {
      return insideTriggerContent;
    }

    const triggerProps = { ...triggerButtonProps };
    const defaultButtonProps = {
      ariaControls: this.state.id,
      ariaExpanded: isOpen,
      ariaHaspopup: true,
      isSelected: isOpen,
    };
    if (!triggerProps.iconAfter && !triggerProps.iconBefore) {
      triggerProps.iconAfter = <ExpandIcon size="medium" label="" />;
    }
    return (
      <Button {...defaultButtonProps} {...triggerProps}>
        {insideTriggerContent}
      </Button>
    );
  }

  // $FlowFixMe
  open = (attrs) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true, event: attrs.event });
  }

  // $FlowFixMe
  close = (attrs) => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  }

  // $FlowFixMe
  toggle = (attrs) => {
    if (attrs.source === 'keydown') return;

    if (this.props.isOpen) {
      this.close(attrs);
    } else {
      this.open(attrs);
    }
  }

  renderTrigger = () => {
    const triggerContent = this.triggerContent();
    return this.isUsingDeprecatedAPI() ? triggerContent : (
      <div ref={(ref) => { this.triggerContainer = ref; }}>
        {triggerContent}
      </div>
    );
  };

  // $FlowFixMe
  renderItems = items => items.map((item, itemIndex) =>
    <Item
      {...item}
      key={itemIndex}
      onActivate={({ event }) => {
        this.props.onItemActivated({ item, event });
      }}
    >
      {item.content}
    </Item>
  )

  // $FlowFixMe
  renderGroups = groups => groups.map((group, groupIndex) =>
    <Group heading={group.heading} elemAfter={group.elemAfter} key={groupIndex}>
      {this.renderItems(group.items)}
    </Group>
  )

  renderDeprecated = () => {
    const { items, shouldFitContainer } = this.props;
    const { id } = this.state;

    return (
      <div
        id={id}
        ref={(ref) => {
          this.domMenuContainer = ref;
          this.domItemsList = ref
            ? ref.querySelectorAll('[data-role="droplistItem"]')
            // $FlowFixMe
            : undefined;
        }}
        role="menu"
        style={shouldFitContainer ? null : { maxWidth: 300 }}
      >
        {this.renderGroups(items)}
      </div>
    );
  }

  render() {
    const {
      appearance, children, isLoading, isOpen, onOpenChange, position,
      shouldAllowMultilineItems, shouldFitContainer, shouldFlip,
    } = this.props;
    const { id } = this.state;
    const isDeprecated = this.isUsingDeprecatedAPI();

    const deprecatedProps = isDeprecated ? {
      onKeyDown: this.handleKeyboardInteractionsDeprecated,
      shouldAllowMultilineItems,
    } : {
      onKeyDown: this.handleKeyboardInteractions,
    };

    return (
      <DropdownItemSelectionCache>
        <Droplist
          appearance={appearance}
          isLoading={isLoading}
          isOpen={isOpen}
          onClick={this.handleClick}
          onOpenChange={onOpenChange}
          position={position}
          shouldFitContainer={shouldFitContainer}
          shouldFlip={shouldFlip}
          trigger={this.renderTrigger()}
          {...deprecatedProps}
        >
          {
            isDeprecated ? this.renderDeprecated() : (
              <WidthConstrainer
                id={id}
                role="menu"
                shouldFitContainer={shouldFitContainer}
              >
                <DropdownItemFocusManager autoFocus={this.sourceOfIsOpen === 'keydown'}>
                  {children}
                </DropdownItemFocusManager>
              </WidthConstrainer>
            )
          }
        </Droplist>
      </DropdownItemSelectionCache>
    );
  }
}
