import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./style.less';
import classNames from 'classnames';

export default class Banner extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    appearance: PropTypes.oneOf(['warning', 'error']),
  };

  static defaultProps = {
    isOpen: false,
    appearance: 'warning',
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
        <div className={styles.bannerSpacer} />
        <div className={styles.bannerFixed}>
          <div className={styles.bannerContent}>
            Your JIRA OnDemand license is about to expire.
            There are two days left to renew your license
          </div>
        </div>
      </div>
    );
  }
}
