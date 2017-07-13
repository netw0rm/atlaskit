import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';

import ModalDialog from '@atlaskit/modal-dialog';
import ProgressBar from './ProgressBar';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import ErrorProgressBarDiv from '../styled/ErrorProgressBarDiv';
import ProgressBarDiv from '../styled/ProgressBarDiv';
import CenterProgressBarDiv from '../styled/CenterProgressBarDiv';

import { withCrossSellProvider } from '../../common/components/CrossSellProvider';

export class LoadingTimeBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    progress: PropTypes.number,
    productLogo: PropTypes.node,
    heading: PropTypes.string,
    completeHeading: PropTypes.string,
    errorHeading: PropTypes.string,
    goToProduct: PropTypes.func,
    closeLoadingDialog: PropTypes.func,
    confluenceTimedOut: PropTypes.bool,
  };

  static defaultProps = {
    goToProduct: () => Promise.resolve(),
    closeLoadingDialog: () => Promise.resolve(),
    errorHeading: 'Something happened...',
    confluenceTimedOut: false,
  };

  state = {
    // TODO set according to the provisioning status and how long it has been polling
    confluenceTimedOut: this.props.confluenceTimedOut,
  };

  handleGoToProductClick = () => {
    const { goToProduct, onComplete } = this.props;
    Promise.resolve(goToProduct()).then(onComplete);
  };

  handleCloseClick = () => {
    const { closeLoadingDialog, onComplete } = this.props;
    Promise.resolve(closeLoadingDialog()).then(onComplete);
  };

  showHeading = () => {
    if (this.state.confluenceTimedOut) {
      return this.props.errorHeading;
    } else if (this.props.progress === 100) {
      return this.props.completeHeading;
    }
    return this.props.heading;
  };

  render() {
    const { productLogo, progress } = this.props;

    const isReady = progress === 100;

    return (
      <ModalDialog
        isOpen
        width="small"
        header={productLogo}
        footer={
          <StartTrialFooter>
            <Button
              isDisabled={!isReady}
              onClick={this.handleGoToProductClick}
              appearance="primary"
            >
              Go to Confluence
            </Button>
            <Button onClick={this.handleCloseClick} appearance="subtle-link">
              Close
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog>
          {this.state.confluenceTimedOut
            ? <ErrorProgressBarDiv>
              <CenterProgressBarDiv>
                <ProgressBar progress={progress} />
              </CenterProgressBarDiv>
              <CrossCircleIcon label="errorIcon" primaryColor="#ff7451" />
            </ErrorProgressBarDiv>
            : <ProgressBarDiv>
              <ProgressBar progress={progress} />
            </ProgressBarDiv>}
          <StartTrialHeader>
            {this.showHeading()}
          </StartTrialHeader>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withCrossSellProvider(
  LoadingTimeBase,
  ({
    crossSell: {
      config: { productLogo, startTrial },
      state: { progress },
      goToProduct,
      closeLoadingDialog,
    },
  }) => ({
    productLogo,
    heading: startTrial.loadingHeading,
    completeHeading: startTrial.loadingCompleteHeading,
    progress,
    goToProduct,
    closeLoadingDialog,
  })
);
