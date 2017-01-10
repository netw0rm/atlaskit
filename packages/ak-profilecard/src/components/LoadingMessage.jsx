import React, { PureComponent } from 'react';
import styles from 'style!../styles/profilecard-resourced.less';

import ProfileSpinner from '../components/Spinner';

export default class LoadingMessage extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles.profilecardResourced}>
        <div className={styles.spinnerContainer}>
          <ProfileSpinner />
        </div>
      </div>
    );
  }
}
