import React, { PureComponent } from 'react';
import styles from 'style!../styles/profilecard-resourced.less';

import icons from '../internal/icons';

const WarningIcon = icons.warning;

export default class ErrorMessage extends PureComponent {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className={styles.profilecardResourced}>
        <div className={styles.errorMessage}>
          <p>
            <WarningIcon />
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
