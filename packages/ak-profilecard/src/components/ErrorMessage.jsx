import React, { PureComponent } from 'react';
import { ErrorIcon } from 'ak-icon';

import styles from 'style!../styles/profilecard-resourced.less';

export default class ErrorMessage extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles.profilecardResourced}>
        <div className={styles.errorMessage}>
          <p>
            <ErrorIcon label="icon error" size="large" />
            <br />
            Something went wrong
            <br />
            <span>We couldn&#39;t get this person&#39;s profile.</span>
          </p>
        </div>
      </div>
    );
  }
}
