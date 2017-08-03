// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';

import StatelessMenu from './DropdownMenuStateless';
import type { OpenChangeObj } from '../types';

// NOTE: duplicate prop-types are validated by the stateless component
/* eslint-disable react/prop-types */
export default class DropdownMenu extends Component {
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
    /** Controls the initial open state of the dropdown. */
    defaultOpen: PropTypes.bool,
    /** If true, a Spinner is rendered instead of the children. */
    isLoading: PropTypes.bool,
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
    /** Deprecated. Option to display multiline items when content is too long.
      * Instead of ellipsing the overflown text it causes item to flow over multiple lines.
      */
    shouldAllowMultilineItems: PropTypes.bool,
    /** Called when the menu is open or closed. Received an object with isOpen state. */
    onOpenChange: PropTypes.func,
    /** Position of the menu. See the documentation of @atlastkit/layer for more details. */
    position: PropTypes.string,
    /** Option to fit dropdown menu width to its parent width. */
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
    defaultOpen: false,
    isLoading: false,
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
    isOpen: this.props.defaultOpen,
    items: [...this.props.items],
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.state.items) {
      this.setState({ items: [...nextProps.items] });
    }
  }

  findActivatedGroup = item => this.state.items.filter(group => group.items.indexOf(item) > -1)[0]

  handleItemActivation = (attrs) => {
    const activatedItem = attrs.item;
    const activatedGroup = this.findActivatedGroup(activatedItem);
    const items = [...this.state.items];

    switch (activatedItem.type) {
      case 'checkbox':
        activatedItem.isChecked = !activatedItem.isChecked;
        this.props.onItemActivated({ item: activatedItem });
        this.setState({ items });
        break;
      case 'radio':
        activatedGroup.items.forEach((i) => {
          if (i === activatedItem) {
            i.isChecked = true;
          } else {
            i.isChecked = false;
          }
        });
        this.props.onItemActivated({ item: activatedItem });
        this.setState({ items });
        break;
      case 'link':
      default:
        this.props.onItemActivated({ item: activatedItem });
        this.close();
        break;
    }
  }

  handleOpenChange = (attrs: OpenChangeObj) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  close = () => {
    this.setState({ isOpen: false });
    this.props.onOpenChange({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    const {
      appearance, children, isLoading, items, position, shouldAllowMultilineItems,
      shouldFitContainer, shouldFlip, trigger, triggerButtonProps, triggerType,
    } = this.props;

    return (
      <StatelessMenu
        appearance={appearance}
        isOpen={isOpen}
        isLoading={isLoading}
        items={items}
        onItemActivated={this.handleItemActivation}
        onOpenChange={this.handleOpenChange}
        position={position}
        shouldAllowMultilineItems={shouldAllowMultilineItems}
        shouldFitContainer={shouldFitContainer}
        shouldFlip={shouldFlip}
        trigger={trigger}
        triggerButtonProps={triggerButtonProps}
        triggerType={triggerType}
      >
        {children}
      </StatelessMenu>
    );
  }
}
