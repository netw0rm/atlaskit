import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import InitializingSpinnerDiv from '../styled/InitializingSpinnerDiv';

class InitializingScreen extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
  };

  defaultProps = {
    isOpen: true,
  };

  render() {
    return (
      <ModalDialog isOpen={this.props.isOpen} width="small" header={<div />} footer={<div />}>
        <InitializingSpinnerDiv>
          <Spinner size="large" isCompleting={false} />
        </InitializingSpinnerDiv>
      </ModalDialog>
    );
  }
}

export default InitializingScreen;
