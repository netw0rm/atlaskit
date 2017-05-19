import React, { PureComponent, PropTypes } from 'react';
import Button from '@atlaskit/button';

import StatelessMenu from './DropdownMenuStateless';

export default class DropdownMenu extends PureComponent {
  static propTypes = {
    /**
      * Controls the appearance of the menu.
      * Default menu has scroll after its height exceeds the pre-defined amount.
      * Tall menu has no restrictions.
      */
    appearance: PropTypes.oneOf(['default', 'tall']),
    /** Content that will be rendered inside the trigger element */
    children: PropTypes.node,
    /** Controls the open state of the dropdown */
    defaultOpen: PropTypes.bool,
    /** Controls whether it is possible to tab to the trigger.
      * This should be true if some interactive element is used inside trigger (links, buttons).
      */
    isTriggerNotTabbable: PropTypes.bool,
    /** List of items.
      * Should be an array of groups (see @atlastkit/droplist-group for available props).
      * Every group should contain array of items (see @atlaskit/droplist-item for available props).
      */
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    /** Called when an item is activated. Receives an object with the activated item */
    onItemActivated: PropTypes.func,
    /** Called when the menu should be open/closed. Received an object with isOpen state */
    onOpenChange: PropTypes.func,
    /** Position of the menu. See the documentation of @atlastkit/layer for more details */
    position: PropTypes.string,
    /** Types of the menu's built-in trigger.
      * default trigger is empty.
      * button trigger uses the Button component with the 'expand' icon.
      */
    triggerType: PropTypes.oneOf(['default', 'button']),
    /** props to pass through to the trigger button. see @atlaskit/button for options */
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
    defaultOpen: false,
    isTriggerNotTabbable: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    triggerType: 'default',
    triggerButtonProps: {},
    shouldFlip: true,
    shouldFitContainer: false,
    shouldAllowMultilineItems: false,
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

  handleOpenChange = (attrs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  }

  close = () => {
    this.setState({ isOpen: false });
    this.props.onOpenChange({ isOpen: false });
  }

  render() {
    const { isOpen, items } = this.state;
    const {
      appearance, children, isTriggerNotTabbable, position, shouldAllowMultilineItems,
      shouldFitContainer, shouldFlip, triggerButtonProps, triggerType,
    } = this.props;

    return (
      <StatelessMenu
        appearance={appearance}
        isOpen={isOpen}
        isTriggerNotTabbable={isTriggerNotTabbable}
        items={items}
        onItemActivated={this.handleItemActivation}
        onOpenChange={this.handleOpenChange}
        position={position}
        shouldAllowMultilineItems={shouldAllowMultilineItems}
        shouldFitContainer={shouldFitContainer}
        shouldFlip={shouldFlip}
        triggerButtonProps={triggerButtonProps}
        triggerType={triggerType}
      >
        {children}
      </StatelessMenu>
    );
  }
}
