import React, { Component } from 'react';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import InitializingSpinnerDiv from '../styled/InitializingSpinnerDiv';

class InitializingScreen extends Component {
  render() {
    return (
      <ModalDialog isOpen width="small" header={<div />} footer={<div />}>
        <InitializingSpinnerDiv>
          <Spinner size="large" isCompleting={false} />
        </InitializingSpinnerDiv>
      </ModalDialog>
    );
  }
}

export default InitializingScreen;
