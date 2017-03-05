import React, { PureComponent } from 'react';
import AkSpinner from '@atlaskit/spinner';

import styles from 'style!../styles/profilecard-resourced.less';

export default class LoadingMessage extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles.profilecardResourced}>
        <div className={styles.spinnerContainer}>
          <AkSpinner />
        </div>
      </div>
    );
  }
}
