import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import Radio from 'ak-icon/glyph/radio';
import Checkbox from 'ak-icon/glyph/checkbox';
import styles from 'style!./styles.less';

import Element from './internal/Element';
import SecondaryText from './internal/SecondaryText';

/* eslint-disable react/no-unused-prop-types */
/**
 * @description This is a basic building block of a dropdown's list.
 * @class Item
 */
export default class Item extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    elemBefore: PropTypes.node,
    elemAfter: PropTypes.node,
    href: PropTypes.string,
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool,
    isActive: PropTypes.bool,
    isSelected: PropTypes.bool,
    isChecked: PropTypes.bool,
    isFocused: PropTypes.bool,
    onActivate: PropTypes.func,
    target: PropTypes.string,
    type: PropTypes.oneOf(['link', 'radio', 'checkbox', 'option']),
  }

  static defaultProps = {
    children: null,
    elemBefore: null,
    elemAfter: null,
    href: null,
    itemContext: 'menu',
    isDisabled: false,
    isHidden: false,
    isActive: false,
    isSelected: false,
    isChecked: false,
    isFocused: false,
    onActivate: () => {},
    target: null,
    type: 'link',
  }

  getClasses = props => classNames(
    [styles.item, {
      [styles.disabled]: props.isDisabled,
      [styles.active]: (props.type === 'link' && props.isActive) || (props.type === 'option' && props.isSelected),
      [styles.checked]: (['checkbox', 'radio'].indexOf(props.type) > -1) && props.isChecked,
      [styles.hidden]: props.isHidden,
    }]
  )

  handleKeyPress = (event) => {
    const { props } = this;
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (!props.isDisabled) {
          props.onActivate({ item: this, event });
        }
        break;
      default:
        break;
    }
  }

  handleClick = (event) => {
    // disabled item can't be activated
    if (!this.props.isDisabled) {
      this.props.onActivate({ item: this, event });
    }
  }

  render() {
    const { props } = this;
    return (
      <span role="presentation">
        <Element
          className={this.getClasses(props)}
          handleClick={this.handleClick}
          handleKeyPress={this.handleKeyPress}
          href={props.href}
          isDisabled={props.isDisabled}
          isChecked={props.isChecked}
          isSelected={props.isSelected}
          isFocused={props.isFocused}
          isHidden={props.isHidden}
          target={props.target}
          type={props.type}
        >
          {
            props.type === 'checkbox'
            ? <span className={styles.checkradio}><Checkbox label="" /></span>
            : null
          }
          {
            props.type === 'radio'
            ? <span className={styles.checkradio}><Radio label="" /></span>
            : null
          }
          {
            props.elemBefore
            ? <span className={styles.elemBefore}>{ props.elemBefore }</span>
            : null
          }
          <span className={styles.itemContent}>{ props.children }</span>
          {
            props.elemAfter
              ? <span className={styles.elemAfter}>{ props.elemAfter }</span>
              : null
          }
        </Element>
      </span>
    );
  }
}

export { SecondaryText };
