import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import IconError from '@atlaskit/icon/glyph/cross-circle';
import AkButton from '@atlaskit/button';

import {
  ErrorWrapper,
  ErrorTitle,
  ErrorText,
} from '../styled/Error';

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
    <ErrorTitle>The user is no longer available for the site</ErrorTitle>
  )

  renderDefault = () => (
    <ErrorTitle>
      Oops, looks like we’re having issues
      <br />
      {
        this.props.reload
        ? <ErrorText>Try again and we’ll give it another shot</ErrorText>
        : null
      }
    </ErrorTitle>
  );

  renderRetryButton = () => (
    this.props.reload
      ? <AkButton
        appearance="link"
        compact
        onClick={this.props.reload}
      >Try again</AkButton>
      : null
  );

  renderErrorContent() {
    const { reason } = this.props.errorType;

    switch (reason) {
      case 'NotFound':
        return this.renderNotFound();

      default:
        return this.renderDefault();
    }
  }

  render() {
    return (
      <ErrorWrapper>
        <IconError label="icon error" size="xlarge" />
        {this.renderErrorContent()}
        {this.renderRetryButton()}
      </ErrorWrapper>
    );
  }
}
