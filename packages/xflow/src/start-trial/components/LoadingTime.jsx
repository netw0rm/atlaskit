import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
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

import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
  UNKNOWN,
} from '../../common/productProvisioningStates';

class LoadingTime extends Component {
  static propTypes = {
    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, DEACTIVATED, INACTIVE, UNKNOWN]).isRequired,
    productLogo: PropTypes.node.isRequired,
    closeLoadingDialog: PropTypes.func,
    goToProduct: PropTypes.func.isRequired,
    heading: PropTypes.string,
    message: PropTypes.string,
    gotoButton: PropTypes.string,
    headerImage: PropTypes.string,
  };

  static defaultProps = {
    closeLoadingDialog: async () => {},
    goToProduct: async () => {},
  };

  state = {
    isLoading: false,
    isReady: false,
  };

  componentDidMount() {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.loading-product-trial.displayed');
  }

  showHeading = () => {
    const { status, firePrivateAnalyticsEvent } = this.props;
    const { isReady } = this.state;

    if (isReady) {
      if (status === ACTIVE) {
        return (
          <FormattedMessage
            id="xflow.generic.loading-product-trial.complete-heading"
            defaultMessage="You're good to go!"
          />
        );
      }
      firePrivateAnalyticsEvent('xflow.loading-product-trial.timed.out');
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
    const { status, firePrivateAnalyticsEvent } = this.props;
    this.setState({
      isReady: true,
    });
    if (status === ACTIVE) {
      firePrivateAnalyticsEvent('xflow.loading-product-trial.loading.finished');
    }
  };

  handleCloseClick = async () => {
    const { firePrivateAnalyticsEvent, status, closeLoadingDialog, onComplete } = this.props;
    firePrivateAnalyticsEvent('xflow.loading-product-trial.close', { status });
    await closeLoadingDialog();
    return onComplete();
  };

  handleGoToProductClick = async () => {
    const { goToProduct, onComplete, firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.loading-product-trial.go.to.product');
    this.setState({
      isLoading: true,
    });
    await goToProduct();
    onComplete();
  };

  render() {
    const { productLogo, progress, status, gotoButton, heading, message, headerImage } = this.props;

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
              <WhereToFindConfluenceImg src={headerImage} alt="app-switcher" />
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

export const LoadingTimeBase = withAnalytics(injectIntl(LoadingTime));

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
          loadingProductHeaderImage,
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
    headerImage: loadingProductHeaderImage,
  })
);
