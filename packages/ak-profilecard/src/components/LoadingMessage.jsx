import React, { PureComponent } from 'react';
import AKSpinner from 'ak-spinner';

import styles from 'style!../styles/profilecard-resourced.less';

export default class LoadingMessage extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles.profilecardResourced}>
        <div className={styles.spinnerContainer}>
          <AKSpinner />
        </div>
      </div>
    );
  }
}
