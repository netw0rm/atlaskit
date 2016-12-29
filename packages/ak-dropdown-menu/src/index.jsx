import React, { PureComponent, PropTypes } from 'react';
import Droplist from 'ak-droplist';
import Button from 'ak-button';
import ExpandIcon from 'ak-icon/glyph/expand';

const Icon = <ExpandIcon label="trigger button" />;

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is a basic building block of a dropdown's list.
 * @class DropdownMenu
 */
export default class DropdownMenu extends PureComponent {
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
     * @description Controls whether trigger is tabbable. Set this to true when you use interactive
     * elements inside trigger (links, buttons, inputs)
     * @memberof DropdownMenu
     * @default false
     */
    isTriggerNotTabbable: PropTypes.bool,
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
    isTriggerNotTabbable: false,
    onItemActivated: () => {},
    onOpenChange: () => {},
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
        if (!activatedItem.href) { // TODO: AK-1299
          this.close();
        }
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

  render = () => {
    const { props, state } = this;
    return (
      <Droplist
        position={props.position}
        appearance={props.appearance}
        isOpen={state.isOpen}
        onItemActivated={this.handleItemActivation}
        onOpenChange={this.handleOpenChange}
        isTriggerNotTabbable={(props.triggerType === 'button') || props.isTriggerNotTabbable}
        listContext="menu"
        items={state.items}
      >
        {props.triggerType === 'button' ?
          (<Button
            isSelected={state.isOpen}
            iconAfter={Icon}
          >{props.children}</Button>) : props.children }
      </Droplist>
    );
  }
}
