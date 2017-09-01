import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import { FormattedMessage } from 'react-intl';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestAccessFooter from '../styled/RequestAccessFooter';
import RequestAccessBannerWrapper from '../styled/RequestAccessBannerWrapper';
import RequestAccessLogoWrapper from '../styled/RequestAccessLogoWrapper';

export class RequestAccessBase extends Component {
  static propTypes = {
    banner: PropTypes.string.isRequired,
    productLogo: PropTypes.element,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    requestTrialAccess: PropTypes.func,
    cancelRequestTrialAccess: PropTypes.func,
  };

  static defaultProps = {
    productLogo: <AtlassianLogo />,
    requestTrialAccess: () => Promise.resolve(),
    cancelRequestTrialAccess: () => Promise.resolve(),
  };

  handleCancelClick = () => {
    const { cancelRequestTrialAccess, onCancel } = this.props;
    Promise.resolve(cancelRequestTrialAccess()).then(onCancel);
  };

  handleRequestAccessClick = () => {
    const { requestTrialAccess, onComplete } = this.props;
    Promise.resolve(requestTrialAccess()).then(() => onComplete());
  };

  render() {
    const { productLogo, banner, heading, message } = this.props;
    return (
      <ModalDialog
        isOpen
        width={'400px'}
        header={
          <div>
            <RequestAccessLogoWrapper>
              {productLogo}
            </RequestAccessLogoWrapper>
            <Lozenge appearance="default">
              <FormattedMessage
                id="xflow.generic.inactive.on.your.site"
                defaultMessage="Inactive on your site"
              />
            </Lozenge>
          </div>
        }
        footer={
          <RequestAccessFooter>
            <Button appearance="primary" onClick={this.handleRequestAccessClick}>
              <FormattedMessage
                id="xflow.generic.request.access.request.button"
                defaultMessage="Request a trial"
              />
            </Button>
            <Button appearance="subtle-link" onClick={this.handleCancelClick}>
              <FormattedMessage
                id="xflow.generic.request.access.close.button"
                defaultMessage="Close"
              />
            </Button>
          </RequestAccessFooter>
        }
      >
        <div>
          <RequestAccessBannerWrapper>
            <img src={banner} alt="banner" />
          </RequestAccessBannerWrapper>
          <RequestTrialHeader>{heading}</RequestTrialHeader>
          {React.isValidElement(message) ? message : <p>{message}</p>}
        </div>
      </ModalDialog>
    );
  }
}

export default withXFlowProvider(
  RequestAccessBase,
  ({
    xFlow: { config: { productLogo, requestTrial }, requestTrialAccess, cancelRequestTrialAccess },
  }) => ({
    productLogo,
    banner: requestTrial.accessBanner,
    heading: requestTrial.accessHeading,
    message: requestTrial.accessMessage,
    prompt: requestTrial.notePrompt,
    placeholder: requestTrial.notePlaceholder,
    requestTrialAccess,
    cancelRequestTrialAccess,
  })
);
