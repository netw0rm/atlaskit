// @flow

import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import uid from 'uid';
import Button from '@atlaskit/button';
import Droplist, { Item, Group } from '@atlaskit/droplist';
import ExpandIcon from '@atlaskit/icon/glyph/expand';

import DropdownItemFocusManager from './context/DropdownItemFocusManager';
import DropdownItemSelectionCache from './context/DropdownItemSelectionCache';
import WidthConstrainer from '../styled/WidthConstrainer';
import { KEY_DOWN, KEY_SPACE, KEY_ENTER } from '../util/keys';

export default class DropdownMenuStateless extends Component {
  static propTypes = {
    /**
      * Controls the appearance of the menu.
      * Default menu has scroll after its height exceeds the pre-defined amount.
      * Tall menu has no restrictions.
      */
    appearance: PropTypes.oneOf(['default', 'tall']),
    /** Content that will be rendered inside the layer element. Should typically be
      * `DropdownItemGroup` or `DropdownItem`, or checkbox / radio variants of those. */
    children: PropTypes.node,
    /** If true, a Spinner is rendered instead of the items */
    isLoading: PropTypes.bool,
    /** Controls the open state of the dropdown. */
    isOpen: PropTypes.bool,
    /** Deprecated. An array of groups. Every group must contain an array of items */
    items: PropTypes.arrayOf(PropTypes.shape({
      elemAfter: PropTypes.node,
      heading: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        elemBefore: PropTypes.node,
        href: PropTypes.string,
        isDisabled: PropTypes.bool,
        target: PropTypes.oneOf(['_blank', '_self']),
      })).isRequired,
    })).isRequired,
    /** Deprecated. Called when an item is activated. Receives an object with the activated item. */
    onItemActivated: PropTypes.func,
    /** Called when the menu should be open/closed. Received an object with isOpen state. */
    onOpenChange: PropTypes.func,
    /** Position of the menu. See the documentation of @atlastkit/layer for more details. */
    position: PropTypes.string,
    /** Deprecated. Option to display multiline items when content is too long.
      * Instead of ellipsing the overflown text it causes item to flow over multiple lines.
      */
    shouldAllowMultilineItems: PropTypes.bool,
    /** Option to fit dropdown menu width to its parent width */
    shouldFitContainer: PropTypes.bool,
    /** Allows the dropdown menu to be placed on the opposite side of its trigger if it does not
      * fit in the viewport. */
    shouldFlip: PropTypes.bool,
    /** Content which will trigger the dropdown menu to open and close. Use with `triggerType`
      * to easily get a button trigger. */
    trigger: PropTypes.node,
    /** Props to pass through to the trigger button. See @atlaskit/button for allowed props. */
    triggerButtonProps: PropTypes.shape(Button.propTypes),
    /** Controls the type of trigger to be used for the dropdown menu. The default trigger allows
      * you to supply your own trigger component. Setting this prop to `button` will render a
      * Button component with an 'expand' icon, and the `trigger` prop contents inside the
      * button. */
    triggerType: PropTypes.oneOf(['default', 'button']),
  }

  static defaultProps = {
    appearance: 'default',
    isLoading: false,
    isOpen: false,
    items: [],
    onItemActivated: (a) => {}, // eslint-disable-line
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
      console.warn('DropdownMenu.items is deprecated. Please switch to the declarative API.');

      if (this.domItemsList) {
        this.focusFirstItem();
      }
    }
  }

  componentDidUpdate = (prevProp: Object) => {
    if (this.isUsingDeprecatedAPI() && this.props.isOpen && !prevProp.isOpen) {
      this.focusFirstItem();
    }
  }

  getNextFocusable = (indexItem: number | void, available: number | void) => {
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

  getPrevFocusable = (indexItem: number | void, available: number| void) => {
    let currentItem = indexItem === undefined ? -1 : indexItem;
    const latestAvailable = available === undefined ? currentItem : available;
    if (currentItem && currentItem > 0) {
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

  focusedItem: number | void

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

  isTargetChildItem = (target: any) => {
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
    // $FlowFixMe - https://github.com/facebook/flow/pull/4687
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
    // $FlowFixMe - https://github.com/facebook/flow/pull/4687
    if (triggerContainer && triggerContainer.contains(event.target)) {
      const { isOpen } = this.props;
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

  open = (attrs: any) => {
    this.sourceOfIsOpen = attrs.source;
    this.props.onOpenChange({ isOpen: true, event: attrs.event });
  }

  close = (attrs: any) => {
    this.sourceOfIsOpen = null;
    this.props.onOpenChange({ isOpen: false, event: attrs.event });
  }

  toggle = (attrs: any) => {
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

  renderItems = (items: any) => items.map((item, itemIndex) =>
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

  renderGroups = (groups: any) => groups.map((group, groupIndex) =>
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
                <DropdownItemFocusManager>
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
