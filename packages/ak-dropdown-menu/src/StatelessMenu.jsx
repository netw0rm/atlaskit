import React, { PureComponent, PropTypes } from 'react';
import Droplist from 'ak-droplist';
import Button from 'ak-button';
import ExpandIcon from 'ak-icon/glyph/expand';

const Icon = <ExpandIcon label="" />;

/* eslint-disable react/no-unused-prop-types */
/**
 * @description Dropdown menu - stateless react component
 * @class StatelessDropdownMenu
 */
export default class StatelessDropdownMenu extends PureComponent {
  static propTypes = {
    /**
     * @description Controls the appearance of the dropdown. Available types: 'default', 'tall'.
     * Default dropdown has scroll after its height exceeds the pre-defined amount. Tall dropdown
     * has no restrictions.
     * @memberof StatelessDropdownMenu
     * @default default
     */
    appearance: PropTypes.oneOf(['default', 'tall']),
    /**
     * @description Position of the menu. See the documentation of ak-layer for more details.
     * @memberof StatelessDropdownMenu
     * @default bottom left
     */
    position: PropTypes.string,
    /**
     * @description Types of the menu's built-in trigger. Available types: 'default', 'button'.
     * @memberof StatelessDropdownMenu
     * @default default
     */
    triggerType: PropTypes.oneOf(['default', 'button']),
    /**
     * @description Controls whether trigger is tabbable. Set this to true when you use interactive
     * elements inside trigger (links, buttons, inputs)
     * @memberof StatelessDropdownMenu
     * @default false
     */
    isTriggerNotTabbable: PropTypes.bool,
    /**
     * @description List of menu items. Should be an array of groups (see the documentation for
     * ak-droplist-group for available props). Every group should contain array of items
     * (see the documentation for ak-droplist-item for available props).
     * @memberof StatelessDropdownMenu
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
     * @memberof StatelessDropdownMenu
     * @default []
     */
    isOpen: PropTypes.bool,
    /**
     * @description  Handler function to be called when the item is activated.
     * @memberof StatelessDropdownMenu
     */
    onItemActivated: PropTypes.func,
    /**
     * @description  Handler function to be called when the menu is opened/closed.
     * @memberof StatelessDropdownMenu
     */
    onOpenChange: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    appearance: 'default',
    position: 'bottom left',
    triggerType: 'default',
    items: [],
    isOpen: false,
    isTriggerNotTabbable: false,
    onItemActivated: () => {},
    onOpenChange: () => {},
  }

  render = () => {
    const { props } = this;
    return (
      <Droplist
        position={props.position}
        appearance={props.appearance}
        isOpen={props.isOpen}
        onItemActivated={props.onItemActivated}
        onOpenChange={props.onOpenChange}
        isTriggerNotTabbable={(props.triggerType === 'button') || props.isTriggerNotTabbable}
        listContext="menu"
        items={props.items}
      >
        {props.triggerType === 'button' ?
          (<Button
            isSelected={props.isOpen}
            iconAfter={Icon}
          >{props.children}</Button>) : props.children }
      </Droplist>
    );
  }
}
