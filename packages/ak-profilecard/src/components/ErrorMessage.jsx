import React, { PureComponent, PropTypes } from 'react';
import { ErrorIcon } from 'ak-icon';
import AkButton from 'ak-button';

import styles from 'style!../styles/profilecard-resourced.less';

export default class ErrorMessage extends PureComponent {
  static propTypes = {
    reload: PropTypes.function,
  };
  static defaultProps = {};

  render() {
    return (
      <div className={styles.profilecardResourced}>
        <div className={styles.errorMessage}>
          <ErrorIcon label="icon error" size="large" />
          <p>
            Oops, looks like we&#39;re having issues
            <br />
            <span>Try again and we&#39;ll give it another shot</span>
          </p>
          <AkButton
            appearance="link"
            compact
            onClick={this.props.reload}
          >Try again</AkButton>
        </div>
      </div>
    );
  }
}
