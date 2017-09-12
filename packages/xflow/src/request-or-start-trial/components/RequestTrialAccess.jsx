import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import SpinnerDiv from '../../common/styled/SpinnerDiv';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestAccessFooter from '../styled/RequestAccessFooter';
import RequestAccessHeader from '../styled/RequestAccessHeader';
import RequestAccessLozengeDiv from '../styled/RequestAccessLozengeDiv';
import RequestAccessImage from '../styled/RequestAccessImage';
import RequestAccessDiv from '../styled/RequestAccessDiv';

class RequestTrialAccess extends Component {
  static propTypes = {
    alreadyRequested: PropTypes.bool.isRequired,
    buttonsDisabled: PropTypes.bool,
    cancelRequestTrialAccess: PropTypes.func,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    learnMoreLink: PropTypes.string,
    message: PropTypes.node.isRequired,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    productLogo: PropTypes.element,
    requestTrialAccess: PropTypes.func,
    spinnerActive: PropTypes.bool,
  };

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    requestTrialAccess: () => Promise.resolve(),
    cancelRequestTrialAccess: () => Promise.resolve(),
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    buttonsDisabled: this.props.buttonsDisabled,
    requestTrialFailed: false,
  }

  componentDidMount() {
    const { firePrivateAnalyticsEvent, alreadyRequested } = this.props;
    firePrivateAnalyticsEvent(alreadyRequested ?
      'xflow.already-requested-trial.displayed' :
      'xflow.request-trial.displayed');
  }

  handleRequestAccessClick = () => {
    const { firePrivateAnalyticsEvent, requestTrialAccess, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial.request-button.clicked');
    this.setState({
      spinnerActive: true,
      buttonsDisabled: true,
      confluenceFailedToStart: false,
    });
    requestTrialAccess()
      .then(() => onComplete())
      .catch(() => {
        firePrivateAnalyticsEvent('xflow.request-trial.failed');
        this.setState({
          buttonsDisabled: false,
          requestTrialFailed: true,
          spinnerActive: false,
        });
      });
    // TODO: add analytics events for success or failure of requestTrialAccess
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
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
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
                isDisabled={this.state.buttonsDisabled}
              >
                <FormattedMessage
                  id="xflow.generic.request-trial.request-button"
                  defaultMessage="Request a trial"
                />
              </Button>}
            <Button
              appearance="subtle-link"
              onClick={this.handleCloseClick}
              isDisabled={this.state.buttonsDisabled}
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

export const RequestTrialAccessBase = withAnalytics(RequestTrialAccess);

export default withXFlowProvider(
  RequestTrialAccessBase,
  ({
    xFlow: { config: { productLogo, requestTrial }, requestTrialAccess, cancelRequestTrialAccess },
  }) => ({
    productLogo,
    image: requestTrial.accessImage,
    heading: requestTrial.accessHeading,
    message: requestTrial.accessMessage,
    learnMoreLink: requestTrial.accessLearnMoreLink,
    prompt: requestTrial.notePrompt,
    placeholder: requestTrial.notePlaceholder,
    requestTrialAccess,
    cancelRequestTrialAccess,
  })
);
