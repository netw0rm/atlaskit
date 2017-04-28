import React, { PureComponent, PropTypes } from 'react';
import ExpandIcon from '@atlaskit/icon/glyph/expand';
import classNames from 'classnames';

import styles from '../styles.less';

export default class Trigger extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    icon: PropTypes.node,
  }

  static defaultProps = {
    isOpen: false,
    isDisabled: false,
    children: null,
    onClick: () => {},
    icon: <ExpandIcon label="" />,
  }

  // disabled because all of the accessibility is handled manually
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  render() {
    return (
      <div
        className={classNames([styles.trigger, {
          [styles.disabled]: this.props.isDisabled,
        }])}
        onClick={this.props.onClick}
        tabIndex={this.props.isDisabled ? -1 : 0}
      >
        <div className={styles.content}>
          {this.props.children}
        </div>
        <div className={styles.expand}>
          {this.props.icon}
        </div>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/no-static-element-interactions */
}
