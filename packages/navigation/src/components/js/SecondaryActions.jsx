import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/SecondaryActions.less';

export default class SecondaryActions extends PureComponent {
  static propTypes = {
    appearance: PropTypes.string,
    isVisible: PropTypes.bool,
    accountItem: PropTypes.func,
    helpItem: PropTypes.func,
  };

  static defaultProps = {
    isVisible: true,
    accountItem: () => null,
    helpItem: () => null,
  }

  render() {
    const {
      appearance,
      isVisible,
      helpItem,
      accountItem,
    } = this.props;
    return (
      <div
        className={classNames(styles.secondaryActions, {
          [styles.isVisible]: isVisible,
        })}
      >
        <div className={styles.actions}>
          { helpItem({ appearance })}
          { accountItem({ appearance })}
        </div>
      </div>
    );
  }
}
