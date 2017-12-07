import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import ModalDialog from '@atlaskit/modal-dialog';
import ErrorFlag from '../../common/components/ErrorFlag';

import ProgressIndicator from './ProgressIndicator';
import StartTrialHeader from '../styled/StartTrialHeader';
import StartTrialFooter from '../styled/StartTrialFooter';
import LoadingTimeTextDiv from '../styled/LoadingTimeTextDiv';
import WhereToFindNewProductDiv from '../styled/WhereToFindNewProductDiv';
import WhereToFindNewProductImg from '../styled/WhereToFindNewProductImg';
import WhereToFindNewProductSVGDiv from '../styled/WhereToFindNewProductSVGDiv';
import WhereToFindNewProductText from '../styled/WhereToFindNewProductText';
import SpinnerDiv from '../../common/styled/SpinnerDiv';

import { withXFlowProvider } from '../../common/components/XFlowProvider';

import {
  ACTIVE,
  ACTIVATING,
  INACTIVE,
  DEACTIVATED,
  UNKNOWN,
} from '../../common/productProvisioningStates';

const messages = defineMessages({
  errorFlagTitle: {
    id: 'xflow.generic.loading-time.error-flag.title',
    defaultMessage: 'Leave it with us',
  },
  errorFlagDescription: {
    id: 'xflow.generic.loading-time.error-flag.description',
    defaultMessage:
      "It's taking longer than usual to set you up, we'll email you when you're good to go.",
  },
});

class LoadingTime extends Component {
  static propTypes = {
    status: PropTypes.oneOf([ACTIVE, ACTIVATING, DEACTIVATED, INACTIVE, UNKNOWN]).isRequired,
    productLogo: PropTypes.node.isRequired,
    heading: PropTypes.string,
    message: PropTypes.string,
    gotoButton: PropTypes.string,
    headerImage: PropTypes.string,
    progress: PropTypes.number.isRequired,

    onComplete: PropTypes.func.isRequired,
    closeLoadingDialog: PropTypes.func,
    goToProduct: PropTypes.func.isRequired,

    firePrivateAnalyticsEvent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
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
    const { status } = this.props;
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
      showErrorFlag: status !== ACTIVE,
    });
    if (status === ACTIVE) {
      firePrivateAnalyticsEvent('xflow.loading-product-trial.loading.finished');
    } else {
      firePrivateAnalyticsEvent('xflow.loading-product-trial.timed.out');
    }
  };

  handleCloseClick = async () => {
    const { firePrivateAnalyticsEvent, status, closeLoadingDialog, onComplete } = this.props;
    const convertStatusFromSymbolToString = String(status).slice(7, -1);
    firePrivateAnalyticsEvent('xflow.loading-product-trial.close', {
      status: convertStatusFromSymbolToString,
    });
    this.setState({
      showErrorFlag: false,
    });
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

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.loading-product-trial.error-flag.dismissed');
    this.setState({
      showErrorFlag: false,
    });
  };

  render() {
    const {
      productLogo,
      progress,
      status,
      gotoButton,
      heading,
      message,
      headerImage,
      intl,
    } = this.props;

    const { isReady, showErrorFlag } = this.state;

    const loadingMessage = (heading && heading.trim()) || (message && message.trim()) ? (
      <LoadingTimeTextDiv>
        <WhereToFindNewProductSVGDiv>
          <WhereToFindNewProductImg src={headerImage} alt="app-switcher" />
        </WhereToFindNewProductSVGDiv>
        <WhereToFindNewProductDiv>
          <h5>{heading}</h5>
          <WhereToFindNewProductText>{message}</WhereToFindNewProductText>
        </WhereToFindNewProductDiv>
      </LoadingTimeTextDiv>
    ) : '';

    return (
      <ModalDialog
        isOpen
        width="small"
        header={
          <div>
            {productLogo}
            <ProgressIndicator
              progress={progress}
              status={status}
              onComplete={this.handleProgressComplete}
            />
          </div>
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
        <div id="xflow-loading-time">
          <StartTrialHeader>{this.showHeading()}</StartTrialHeader>
          {loadingMessage}
        </div>
        <ErrorFlag
          title={intl.formatMessage(messages.errorFlagTitle)}
          description={intl.formatMessage(messages.errorFlagDescription)}
          showFlag={showErrorFlag}
          source="loading-product-trial"
          onDismissed={this.handleErrorFlagDismiss}
        />
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
