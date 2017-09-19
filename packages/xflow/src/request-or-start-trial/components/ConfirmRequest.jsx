import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import { FormattedMessage } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestAccessFooter from '../styled/RequestAccessFooter';
import RequestAccessHeader from '../styled/RequestAccessHeader';
import RequestAccessLozengeDiv from '../styled/RequestAccessLozengeDiv';
import RequestAccessImage from '../styled/RequestAccessImage';
import RequestAccessDiv from '../styled/RequestAccessDiv';

class ConfirmRequest extends Component {
  static propTypes = {
    alreadyRequested: PropTypes.bool.isRequired,
    cancelRequestTrialAccess: PropTypes.func,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    learnMoreLink: PropTypes.string,
    message: PropTypes.node.isRequired,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    productLogo: PropTypes.element,
  };

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    cancelRequestTrialAccess: () => Promise.resolve(),
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent, alreadyRequested } = this.props;
    firePrivateAnalyticsEvent(alreadyRequested ?
      'xflow.already-requested-trial.displayed' :
      'xflow.request-trial.displayed');
  }

  handleRequestAccessClick = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial.request-button.clicked');
    onComplete();
  };

  handleLearnMoreClick = () => {
    const { firePrivateAnalyticsEvent, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.already-requested-trial.learn-more-button.clicked');
    Promise.resolve(() => onComplete());
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
    const {
      alreadyRequested,
      firePrivateAnalyticsEvent,
      cancelRequestTrialAccess,
      onCancel,
    } = this.props;
    firePrivateAnalyticsEvent(alreadyRequested ?
      'xflow.already-requested-trial.close-button.clicked' :
      'xflow.request-trial.close-button.clicked');
    Promise.resolve(cancelRequestTrialAccess()).then(onCancel);
  };

  render() {
    const { alreadyRequested, productLogo, image, learnMoreLink, heading, message } = this.props;
    return (
      <ModalDialog
        isOpen
        width={'400px'}
        header={
          <div>
            <RequestAccessHeader>
              {productLogo}
              <RequestAccessLozengeDiv>
                <Lozenge isBold>
                  {alreadyRequested ? <FormattedMessage
                    id="xflow.generic.request-trial.requested-lozenge"
                    defaultMessage="Requested"
                  /> :
                  <FormattedMessage
                    id="xflow.generic.request-trial.inactive-lozenge"
                    defaultMessage="Inactive on your site"
                  />}
                </Lozenge>
              </RequestAccessLozengeDiv>
            </RequestAccessHeader>
            <RequestAccessImage src={image} alt="files" />
          </div>
        }
        footer={
          <RequestAccessFooter>
            {alreadyRequested ?
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
              </span> :
              <Button
                appearance="primary"
                onClick={this.handleRequestAccessClick}
              >
                <FormattedMessage
                  id="xflow.generic.request-trial.request-button"
                  defaultMessage="Request a trial"
                />
              </Button>}
            <Button
              appearance="subtle-link"
              onClick={this.handleCloseClick}
            >
              <FormattedMessage
                id="xflow.generic.request-trial.close-button"
                defaultMessage="Close"
              />
            </Button>
          </RequestAccessFooter>
        }
      >
        <RequestAccessDiv>
          <RequestTrialHeader>{heading}</RequestTrialHeader>
          {React.isValidElement(message) ? message : <p>{message}</p>}
        </RequestAccessDiv>
      </ModalDialog>
    );
  }
}

export const ConfirmRequestBase = withAnalytics(ConfirmRequest);

export default withXFlowProvider(
  ConfirmRequestBase,
  ({
    xFlow: { config: { productLogo, requestTrial }, requestTrialAccess, cancelRequestTrialAccess },
  }) => ({
    productLogo,
    image: requestTrial.accessImage,
    heading: requestTrial.accessHeading,
    message: requestTrial.accessMessage,
    learnMoreLink: requestTrial.accessLearnMoreLink,
    requestTrialAccess,
    cancelRequestTrialAccess,
  })
);
