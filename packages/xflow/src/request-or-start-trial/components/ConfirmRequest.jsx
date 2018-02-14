import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import { FormattedMessage } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialFooter from '../styled/RequestTrialFooter';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestTrialLozengeDiv from '../styled/RequestTrialLozengeDiv';
import RequestTrialImage from '../styled/RequestTrialImage';
import RequestTrialDiv from '../styled/RequestTrialDiv';

class ConfirmRequest extends Component {
  static propTypes = {
    productLogo: PropTypes.element,
    image: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    learnMoreLink: PropTypes.string,
    alreadyRequested: PropTypes.bool.isRequired,

    contextInfo: PropTypes.shape({
      contextualImage: PropTypes.string,
      contextualHeading: PropTypes.string,
      contextualMessage: PropTypes.string,
      reactivateCTA: PropTypes.string,
      trialCTA: PropTypes.string,
    }),

    cancelRequestTrial: PropTypes.func,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    cancelRequestTrial: () => {},
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent, alreadyRequested } = this.props;
    firePrivateAnalyticsEvent(
      alreadyRequested ? 'xflow.already-requested-trial.displayed' : 'xflow.request-trial.displayed'
    );
  }

  handleRequestTrialClick = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial.request-button.clicked');
    return onComplete();
  };

  handleLearnMoreClick = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.already-requested-trial.learn-more-button.clicked');
    return onComplete();
  };

  // This is necessary to capture middle and right mouse clicks
  // while not breaking keyboard functionality
  handleLearnMoreAlternateClick = evt => {
    if (evt.button > 0) {
      const { firePrivateAnalyticsEvent } = this.props;
      firePrivateAnalyticsEvent('xflow.already-requested-trial.learn-more-button.clicked');
    }
  };

  handleCloseClick = () => {
    const { alreadyRequested, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent(
      alreadyRequested
        ? 'xflow.already-requested-trial.close-button.clicked'
        : 'xflow.request-trial.close-button.clicked'
    );
    return this.handleDialogClosed();
  };

  handleDialogClosed = async () => {
    const { firePrivateAnalyticsEvent, cancelRequestTrial, onCancel } = this.props;

    firePrivateAnalyticsEvent('xflow.request-trial.dialog.closed');
    await cancelRequestTrial();
    return onCancel();
  };

  render() {
    const {
      alreadyRequested,
      contextInfo,
      productLogo,
      image,
      learnMoreLink,
      heading,
      message,
    } = this.props;
    return (
      <ModalDialog
        width={'400px'}
        header={() => (
          <div id="xflow-confirm-request">
            <RequestTrialHeader>
              {productLogo}
              <RequestTrialLozengeDiv>
                <Lozenge isBold>
                  {alreadyRequested ? (
                    <FormattedMessage
                      id="xflow.generic.request-trial.requested-lozenge"
                      defaultMessage="Requested"
                    />
                  ) : (
                    <FormattedMessage
                      id="xflow.generic.request-trial.inactive-lozenge"
                      defaultMessage="Inactive on your site"
                    />
                  )}
                </Lozenge>
              </RequestTrialLozengeDiv>
            </RequestTrialHeader>
            <RequestTrialImage
              src={contextInfo && contextInfo.contextualImage ? contextInfo.contextualImage : image}
              alt="files"
            />
          </div>
        )}
        footer={() => (
          <RequestTrialFooter>
            {alreadyRequested ? (
              <span
                onMouseDown={this.handleLearnMoreAlternateClick}
                id="xflow-already-requested-trial-learn-more-span"
              >
                <Button
                  id="xflow-already-requested-trial-learn-more-button"
                  appearance="link"
                  onClick={this.handleLearnMoreClick}
                  href={learnMoreLink}
                  target="_blank"
                >
                  <FormattedMessage
                    id="xflow.generic.already-requested-trial.learn-more-button"
                    defaultMessage="Learn more"
                  />
                </Button>
              </span>
            ) : (
              <Button appearance="primary" onClick={this.handleRequestTrialClick}>
                <FormattedMessage
                  id="xflow.generic.request-trial.request-button"
                  defaultMessage="Request a trial"
                />
              </Button>
            )}
            <Button appearance="subtle-link" onClick={this.handleCloseClick}>
              <FormattedMessage
                id="xflow.generic.request-trial.close-button"
                defaultMessage="Close"
              />
            </Button>
          </RequestTrialFooter>
        )}
        shouldCloseOnOverlayClick={false}
        onClose={this.handleDialogClosed}
      >
        <RequestTrialDiv>
          <h3>
            {contextInfo ? contextInfo.contextualHeading : heading}
          </h3>
          {contextInfo ? <p>{contextInfo.contextualMessage}</p> : <p>{message}</p>}
        </RequestTrialDiv>
      </ModalDialog>
    );
  }
}

export const ConfirmRequestBase = withAnalytics(ConfirmRequest);

export default withXFlowProvider(
  ConfirmRequestBase,
  ({ xFlow: { config: { productLogo, requestTrial }, cancelRequestTrial } }) => ({
    productLogo,
    image: requestTrial.accessImage,
    heading: requestTrial.accessHeading,
    message: requestTrial.accessMessage,
    learnMoreLink: requestTrial.accessLearnMoreLink,
    cancelRequestTrial,
  })
);
