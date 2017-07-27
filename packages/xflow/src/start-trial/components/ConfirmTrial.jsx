import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import ErrorFlag from './ErrorFlag';

import SpinnerDiv from '../styled/SpinnerDiv';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import { withXFlowProvider } from '../../common/components/XFlowProvider';

export class ConfirmTrialBase extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,
    spinnerActive: PropTypes.bool,
    confirmButtonDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,
    confirmButtonText: PropTypes.string.isRequired,
    cancelButtonText: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    errorFlagTitle: PropTypes.string.isRequired,
    errorFlagDescription: PropTypes.node.isRequired,
  };

  static defaultProps = {
    startProductTrial: () => Promise.resolve(),
    cancelStartProductTrial: () => Promise.resolve(),
  };

  state = {
    spinnerActive: this.props.spinnerActive,
    confirmButtonDisabled: this.props.confirmButtonDisabled,
    confluenceFailedToStart: false,
  };

  handleConfirmClick = () => {
    const { startProductTrial, onComplete } = this.props;

    this.setState({
      spinnerActive: true,
      confirmButtonDisabled: true,
      confluenceFailedToStart: false,
    });

    Promise.resolve(startProductTrial()).then(() => onComplete()).catch(() => {
      this.setState({
        confluenceFailedToStart: true,
        spinnerActive: false,
        confirmButtonDisabled: false,
      });
    });
  };

  handleCancelClick = () => {
    const { cancelStartProductTrial, onCancel } = this.props;
    Promise.resolve(cancelStartProductTrial()).then(onCancel);
  };

  render() {
    const {
      productLogo,
      confirmButtonText,
      cancelButtonText,
      heading,
      message,
      errorFlagTitle,
      errorFlagDescription,
    } = this.props;
    return (
      <ModalDialog
        isOpen
        width="small"
        header={productLogo}
        footer={
          <StartTrialFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.spinnerActive} />
            </SpinnerDiv>
            <Button
              id="xflow-confirm-trial-confirm-button"
              onClick={this.handleConfirmClick}
              appearance="primary"
              isDisabled={this.state.confirmButtonDisabled}
            >
              { confirmButtonText }
            </Button>
            <Button
              id="xflow-confirm-trial-cancel-button"
              onClick={this.handleCancelClick}
              appearance="subtle-link"
            >
              { cancelButtonText }
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog id="xflow-confirm-trial">
          <StartTrialHeader>
            { heading }
          </StartTrialHeader>
          <p>
            { message }
          </p>
        </StartTrialDialog>
        <ErrorFlag
          title={errorFlagTitle}
          description={errorFlagDescription}
          showFlag={this.state.confluenceFailedToStart}
          onDismissed={() => this.setState({ confluenceFailedToStart: false })}
        />
      </ModalDialog>
    );
  }
}

export default withXFlowProvider(
  ConfirmTrialBase,
  ({ xFlow: {
    config: {
      productLogo,
      startTrial: {
        confirmButtonText,
        cancelButtonText,
        trialHeading,
        trialMessage,
        errorFlagTitle,
        errorFlagDescription,
    },
    },
    startProductTrial,
    cancelStartProductTrial,
  } }) => ({
    productLogo,
    startProductTrial,
    cancelStartProductTrial,
    confirmButtonText,
    cancelButtonText,
    heading: trialHeading,
    message: trialMessage,
    errorFlagTitle,
    errorFlagDescription,
  })
);
