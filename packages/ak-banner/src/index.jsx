import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./style.less';
import classNames from 'classnames';

export default class Banner extends PureComponent {
  static propTypes = {
    appearance: PropTypes.oneOf(['warning', 'error']),
    children: PropTypes.node,
    icon: PropTypes.element,
    isOpen: PropTypes.bool,
  };

  static defaultProps = {
    appearance: 'warning',
    isOpen: false,
  };

  render() {
    return (
      <div
        className={classNames({
          [styles.banner]: true,
          [styles[this.props.appearance]]: true,
          [styles.open]: this.props.isOpen,
        })}
      >
        <div className={styles.bannerContent}>
          <span className={styles.bannerIcon}>{this.props.icon}</span>
          <span className={styles.bannerText}>{this.props.children}</span>
        </div>
      </div>
    );
  }
}
