import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import ModalDialog from '@atlaskit/modal-dialog';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage } from 'react-intl';
import ErrorFlag from './ErrorFlag';

import SpinnerDiv from '../styled/SpinnerDiv';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialFooter from '../styled/StartTrialFooter';
import StartTrialHeader from '../styled/StartTrialHeader';
import { withCrossSellProvider } from '../../common/components/CrossSellProvider';
import i18nId from '../../common/i18nId';

const i18n = i18nId('confirm-trial');

export class ConfirmTrialBase extends Component {
  static propTypes = {
    productLogo: PropTypes.node.isRequired,
    spinnerActive: PropTypes.bool,
    confirmButtonDisabled: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    startProductTrial: PropTypes.func,
    cancelStartProductTrial: PropTypes.func,
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
    Promise.resolve(startProductTrial()).then(onComplete).catch(() => {
      setTimeout(() => {
        this.setState({
          confluenceFailedToStart: true,
          spinnerActive: false,
          confirmButtonDisabled: false,
        });
      }, 1500);
    });
  };

  handleCancelClick = () => {
    const { cancelStartProductTrial, onCancel } = this.props;
    Promise.resolve(cancelStartProductTrial()).then(onCancel);
  };

  render() {
    const { productLogo } = this.props;
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
              onClick={this.handleConfirmClick}
              appearance="primary"
              isDisabled={this.state.confirmButtonDisabled}
            >
              <FormattedMessage id={i18n`confirm-button`} />
            </Button>
            <Button onClick={this.handleCancelClick} appearance="subtle-link">
              <FormattedMessage id={i18n`cancel-button`} />
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          <StartTrialHeader>
            <FormattedMessage id={i18n`heading`} />
          </StartTrialHeader>
          <p>
            <FormattedMessage id={i18n`message`} values={{ br: <br /> }} />
          </p>
        </StartTrialDialog>
        <ErrorFlag
          title="Oops... Something went wrong"
          description="Let's try again."
          showFlag={this.state.confluenceFailedToStart}
          onDismissed={() => this.setState({ confluenceFailedToStart: false })}
        />
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(
  ConfirmTrialBase,
  ({ crossSell: { config: { productLogo }, startProductTrial, cancelStartProductTrial } }) => ({
    productLogo,
    startProductTrial,
    cancelStartProductTrial,
  })
);
