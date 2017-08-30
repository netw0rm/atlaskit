import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import LockFilledIcon from '@atlaskit/icon/glyph/lock-filled';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';

export class RequestTrialAccessBase extends Component {
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
        header={
          <div>
            <img src={banner} alt="" />
            <span><LockFilledIcon label="" size="small" /> Inactive on your site</span>
          </div>
        }
        footer={
          <p>
            <Button appearance="primary" onClick={this.handleRequestAccessClick}>
              Request access
            </Button>
            <Button appearance="subtle-link" onClick={this.handleCancelClick}>Cancel</Button>
          </p>
        }
      >
        <div>
          {productLogo}
          <RequestTrialHeader>{heading}</RequestTrialHeader>
          {React.isValidElement(message) ? message : <p>{message}</p>}
        </div>
      </ModalDialog>
    );
  }
}

export default withXFlowProvider(
  RequestTrialAccessBase,
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
