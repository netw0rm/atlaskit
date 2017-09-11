import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AtlassianLogo } from '@atlaskit/logo';
import ModalDialog from '@atlaskit/modal-dialog';
import Button from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import RequestTrialHeader from '../styled/RequestTrialHeader';
import RequestAccessFooter from '../styled/RequestAccessFooter';
import RequestAccessHeader from '../styled/RequestAccessHeader';
import RequestAccessLozengeDiv from '../styled/RequestAccessLozengeDiv';
import RequestAccessImage from '../styled/RequestAccessImage';
import RequestAccessDiv from '../styled/RequestAccessDiv';

export class RequestTrialAccessBase extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
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
    const { productLogo, image, heading, message } = this.props;
    return (
      <ModalDialog
        isOpen
        width={'400px'}
        header={
          <div>
            <RequestAccessHeader>
              {productLogo}
              <RequestAccessLozengeDiv>
                <Lozenge isBold>Inactive on your site</Lozenge>
              </RequestAccessLozengeDiv>
            </RequestAccessHeader>
            <RequestAccessImage src={image} alt="" />
          </div>
        }
        footer={
          <RequestAccessFooter>
            <Button appearance="primary" onClick={this.handleRequestAccessClick}>
              Request a trial
            </Button>
            <Button appearance="subtle-link" onClick={this.handleCancelClick}>Close</Button>
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
