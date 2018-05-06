import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
import Spinner from '@atlaskit/spinner';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { withAnalytics } from '@atlaskit/analytics';
import ModalDialog from '@atlaskit/modal-dialog';
import ErrorFlag from '../../common/components/ErrorFlag';

import ProgressIndicator from './ProgressIndicator';
import StartTrialHeading from '../styled/StartTrialHeading';
import ModalDialogHeader from '../../common/styled/ModalDialogHeader';
import ModalDialogFooter from '../../common/styled/ModalDialogFooter';
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
    closeLoadingDialog: () => {},
    goToProduct: () => {},
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
    return onComplete();
  };

  handleDialogClosed = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.loading-product-trial.dialog.closed');
  };

  handleErrorFlagDismiss = () => {
    const { firePrivateAnalyticsEvent } = this.props;
    firePrivateAnalyticsEvent('xflow.loading-product-trial.error-flag.dismissed');
    this.setState({
      showErrorFlag: false,
    });
  };

  header = () => {
    const { productLogo, progress, status } = this.props;
    return (
      <ModalDialogHeader>
        {productLogo}
        <ProgressIndicator
          progress={progress}
          status={status}
          onComplete={this.handleProgressComplete}
        />
      </ModalDialogHeader>
    );
  };

  footer = () => {
    const { status, gotoButton } = this.props;
    const { isReady } = this.state;

    return (
      <ModalDialogFooter>
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
      </ModalDialogFooter>
    );
  };

  render() {
    const { heading, message, headerImage, intl } = this.props;
    const { showErrorFlag } = this.state;

    const loadingMessage =
      (heading && heading.trim()) || (message && message.trim()) ? (
        <LoadingTimeTextDiv>
          <WhereToFindNewProductSVGDiv>
            <WhereToFindNewProductImg src={headerImage} alt="app-switcher" />
          </WhereToFindNewProductSVGDiv>
          <WhereToFindNewProductDiv>
            <h5>{heading}</h5>
            <WhereToFindNewProductText>{message}</WhereToFindNewProductText>
          </WhereToFindNewProductDiv>
        </LoadingTimeTextDiv>
      ) : (
        ''
      );

    return (
      <ModalDialog
        width="small"
        header={this.header}
        footer={this.footer}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEscapePress={false}
        onClose={this.handleDialogClosed}
      >
        <div id="xflow-loading-time">
          <StartTrialHeading>{this.showHeading()}</StartTrialHeading>
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
