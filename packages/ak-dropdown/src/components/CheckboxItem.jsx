import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';

import BaseItem from './BaseItem';
import styles from '../less/styles.less';

/**
 * @description The definition for the Dropdown component.
 * @class CheckboxItem
 */
export default class CheckboxItem extends PureComponent {
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
    isChecked: PropTypes.bool,

    elemAfter: PropTypes.node,

    onActivate: PropTypes.func,

    children: PropTypes.node,

    className: PropTypes.string,
  }

  static defaultProps = {
    onActivate: () => {},
    isDisabled: false,
    isHidden: false,
    isChecked: false
  };

  render = () => {
    const classes = classNames(
      [styles.locals.checkboxItem, {
        [styles.locals.checked]: isChecked,
      }, className]
    );

    return (
      <BaseItem
        { ...this.props }
        ariaRole="menuitem"
        className={classes}
      >
        { this.props.children }
      </BaseItem>
    );
  }
}
