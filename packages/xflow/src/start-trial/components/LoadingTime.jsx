import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage } from 'react-intl';

import ModalDialog from '@atlaskit/modal-dialog';
import ProgressIndicator from './ProgressIndicator';
import StartTrialDialog from '../styled/StartTrialDialog';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialHeaderDiv from '../styled/StartTrialHeaderDiv';
import StartTrialFooter from '../styled/StartTrialFooter';
import LoadingTimeTextDiv from '../styled/LoadingTimeTextDiv';
import WhereToFindConfluenceDiv from '../styled/WhereToFindConfluenceDiv';
import WhereToFindConfluenceImg from '../styled/WhereToFindConfluenceImg';
import WhereToFindConfluenceSVGDiv from '../styled/WhereToFindConfluenceSVGDiv';
import WhereToFindConfluenceText from '../styled/WhereToFindConfluenceText';
import SpinnerDiv from '../styled/SpinnerDiv';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import { ACTIVE, ACTIVATING, INACTIVE, UNKNOWN } from '../../common/productProvisioningStates';

export class LoadingTimeBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, INACTIVE, UNKNOWN]).isRequired,
    productLogo: PropTypes.node.isRequired,
    closeLoadingDialog: PropTypes.func,
    goToProduct: PropTypes.func.isRequired,
    heading: PropTypes.string,
    message: PropTypes.string,
    gotoButton: PropTypes.string,
    svgImg: PropTypes.string,
  };

  static defaultProps = {
    closeLoadingDialog: async () => {},
    goToProduct: async () => {},
  };

  state = {
    isLoading: false,
    isReady: false,
  };

  showHeading = () => {
    const { status } = this.props;
    const { isReady } = this.state;

    if (isReady) {
      if (status === ACTIVE) {
        // this.props.firePrivateAnalyticsEvent('xflow.loading.screen.loading.finished');
        return (
          <FormattedMessage
            id="xflow.generic.loading-product-trial.complete-heading"
            defaultMessage="You're good to go!"
          />
        );
      }
      // this.props.firePrivateAnalyticsEvent('xflow.loading.screen.timed.out');
      return (
        <FormattedMessage
          id="xflow.generic.loading-product-trial.error-heading"
          defaultMessage="Uh oh. That didn't work..."
        />
      );
    }
    return (
      <FormattedMessage
        id="xflow.generic.loading-product-trial.loading-heading"
        defaultMessage="We're turning some cogs..."
      />
    );
  };

  handleProgressComplete = () => {
    this.setState({
      isReady: true,
    });
  };

  handleCloseClick = async () => {
    // this.props.firePrivateAnalyticsEvent('xflow.loading.screen.close');
    const { closeLoadingDialog, onComplete } = this.props;
    await closeLoadingDialog();
    return onComplete();
  };

  handleGoToProductClick = async () => {
    // this.props.firePrivateAnalyticsEvent('xflow.loading.screen.go.to.product');
    const { goToProduct, onComplete } = this.props;
    this.setState({
      isLoading: true,
    });
    await goToProduct();
    onComplete();
  };

  render() {
    const { productLogo, progress, status, gotoButton, heading, message, svgImg } = this.props;

    const { isReady } = this.state;

    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <StartTrialHeaderDiv>
            {productLogo}
            <ProgressIndicator
              progress={progress}
              status={status}
              onComplete={this.handleProgressComplete}
            />
          </StartTrialHeaderDiv>
        }
        footer={
          <StartTrialFooter>
            <SpinnerDiv>
              <Spinner isCompleting={!this.state.isLoading} />
            </SpinnerDiv>
            <Button
              id="xflow-loading-go-to-product-button"
              isDisabled={!(isReady && status === ACTIVE) || this.state.isLoading}
              onClick={this.handleGoToProductClick}
              appearance="primary"
            >
              {gotoButton}
            </Button>
            <Button
              id="xflow-loading-close-button"
              onClick={this.handleCloseClick}
              appearance="subtle-link"
            >
              <FormattedMessage
                id="xflow.generic.loading-product-trial.close-button"
                defaultMessage="Close"
              />
            </Button>
          </StartTrialFooter>
        }
      >
        <StartTrialDialog id="xflow-loading-time">
          <StartTrialHeader>
            {this.showHeading()}
          </StartTrialHeader>
          <LoadingTimeTextDiv>
            <WhereToFindConfluenceSVGDiv>
              <WhereToFindConfluenceImg
                src={svgImg}
                alt="app-switcher"
              />
            </WhereToFindConfluenceSVGDiv>
            <WhereToFindConfluenceDiv>
              <h5>
                {heading}
              </h5>
              <WhereToFindConfluenceText>
                {message}
              </WhereToFindConfluenceText>
            </WhereToFindConfluenceDiv>
          </LoadingTimeTextDiv>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withXFlowProvider(
    LoadingTimeBase,
    ({
      xFlow: {
        config: {
          productLogo,
          startTrial: {
            loadingProductHeading,
            loadingProductMessage,
            loadingProductGotoProductButton,
            loadingSVGImg,
          },
        },
        goToProduct,
        closeLoadingDialog,
        progress,
        status,
      },
    }) => ({
      productLogo,
      progress,
      status,
      goToProduct,
      closeLoadingDialog,
      heading: loadingProductHeading,
      message: loadingProductMessage,
      gotoButton: loadingProductGotoProductButton,
      svgImg: loadingSVGImg,
    })
  );
