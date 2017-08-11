import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import AkButton from '@atlaskit/button';

import styles from '../styles/profilecard.less';

export default class ErrorMessage extends PureComponent {
  static propTypes = {
    reload: PropTypes.func,
    errorType: PropTypes.shape({
      reason: PropTypes.string,
    }),
  };

  static defaultProps = {
    errorType: {
      reason: 'default',
    },
  };

  renderNotFound = () => (
    <p>The user is no longer available for the site</p>
  )

  renderDefault = () => (
    <div>
      <p>
        Oops, looks like we’re having issues
        <br />
        {this.props.reload ? <span>Try again and we’ll give it another shot</span> : null}
      </p>
      {this.props.reload ? <AkButton
        appearance="link"
        compact
        onClick={this.props.reload}
      >Try again</AkButton> : null}
    </div>
  );

  render() {
    const { reason } = this.props.errorType;
    let content = null;

    if (reason === 'NotFound') {
      content = this.renderNotFound();
    } else {
      content = this.renderDefault();
    }

    return (
      <div className={styles.errorMessage}>
        <CrossCircleIcon label="icon error" size="large" />
        {content}
      </div>
    );
  }
}
