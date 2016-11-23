import React, { PropTypes, PureComponent } from 'react';
import BaseItem from './BaseItem';
import styles from '../less/styles.less';

/**
 * @description The definition for the Dropdown component.
 * @class LinkItem
 */
export default class LinkItem extends PureComponent {
  static propTypes = {
    /**
     * @description disabled state of a dropdown's item
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item disabled>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem.disabled = true;
     */
    isDisabled: PropTypes.bool,

    /**
     * @description defines whether the item is invisible
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item hidden>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem.hidden = true;
     */
    isHidden: PropTypes.bool,

    /**
     * @description active state of a dropdown's item.
     * Set this to true if for some reason you want this particular item to be highlighted
     * @memberof Dropdown
     * @default false
     * @type {Boolean}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item active>some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem.active = true;
     */
    isActive: PropTypes.bool,
    /**
     * @description href for a dropdown item's link'
     * @memberof Dropdown
     * @default ''
     * @type {String}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item href="http://google.com">some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem.href = 'http://google.com';
     */
    href: PropTypes.string,
    /**
     * @description target for a dropdown item's link
     * @memberof Dropdown
     * @default ''
     * @type {String}
     * @example @html <ak-dropdown>
     *   <ak-dropdown-item href="http://google.com" target="_blank">some content</ak-dropdown-item>
     * </ak-dropdown>
     * @example @js dropdownItem._target = '_blank';
     */
    target: PropTypes.string,

    elemBefore: PropTypes.node,

    elemAfter: PropTypes.node,

    onActivate: PropTypes.func,

    children: PropTypes.node,

    className: PropTypes.string,
  }

  static defaultProps = {
    onActivate: () => {},
    isDisabled: false,
    isHidden: false,
  };

  render = () => {
    return (
      <BaseItem { ...this.props } ariaRole="menuitem">
        { this.props.children }
      </BaseItem>
    );
  }
}
