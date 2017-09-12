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

class RequestTrialAccess extends Component {
  static propTypes = {
    alreadyRequested: PropTypes.bool.isRequired,
    cancelRequestTrialAccess: PropTypes.func,
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    heading: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    productLogo: PropTypes.element,
    requestTrialAccess: PropTypes.func,
  };

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    requestTrialAccess: () => Promise.resolve(),
    cancelRequestTrialAccess: () => Promise.resolve(),
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent, alreadyRequested } = this.props;
    firePrivateAnalyticsEvent(alreadyRequested ?
      'xflow.already-requested-trial.displayed' :
      'xflow.request-trial.displayed');
  }

  handleRequestAccessClick = () => {
    const { firePrivateAnalyticsEvent, requestTrialAccess, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.request-trial.request-button.clicked');
    Promise.resolve(requestTrialAccess()).then(() => onComplete());
    // TODO: add analytics events for success or failure of requestTrialAccess
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
    const { alreadyRequested, productLogo, image, heading, message } = this.props;
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
            <Button appearance="primary" onClick={this.handleRequestAccessClick}>
              <FormattedMessage
                id="xflow.generic.request-trial.request-button"
                defaultMessage="Request a trial"
              />
            </Button>
            <Button appearance="subtle-link" onClick={this.handleCloseClick}>
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
    prompt: requestTrial.notePrompt,
    placeholder: requestTrial.notePlaceholder,
    requestTrialAccess,
    cancelRequestTrialAccess,
  })
);
