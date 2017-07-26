import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@atlaskit/button';
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

import { withXFlowProvider } from '../../common/components/XFlowProvider';
import i18nId from '../../common/i18nId';
import { withAnalytics } from '../../common/components/Analytics';

const i18n = i18nId('loading-product-trial');

export class LoadingTimeBase extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
    progress: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['ACTIVE', 'INACTIVE', 'UNKNOWN']).isRequired,
    productLogo: PropTypes.node.isRequired,
    goToProduct: PropTypes.func.isRequired,
    closeLoadingDialog: PropTypes.func,
    firePrivateAnalyticsEvent: PropTypes.func,
  };

  static defaultProps = {
    closeLoadingDialog: () => Promise.resolve(),
  };

  state = {
    // TODO set according to the provisioning status and how long it has been polling
    isReady: false,
  };

  handleGoToProductClick = () => {
    this.props.firePrivateAnalyticsEvent('xflow.loading.screen.go.to.product');
    const { goToProduct, onComplete } = this.props;
    Promise.resolve(goToProduct()).then(() => onComplete());
  };

  handleCloseClick = () => {
    this.props.firePrivateAnalyticsEvent('xflow.loading.screen.close');
    const { closeLoadingDialog, onComplete } = this.props;
    Promise.resolve(closeLoadingDialog()).then(() => onComplete());
  };

  showHeading = () => {
    const { status } = this.props;
    const { isReady } = this.state;

    if (isReady) {
      if (status === 'ACTIVE') {
        this.props.firePrivateAnalyticsEvent('xflow.loading.screen.loading.finished');
        return <FormattedMessage id={i18n`complete-heading`} />;
      }
      this.props.firePrivateAnalyticsEvent('xflow.loading.screen.timed.out');
      return <FormattedMessage id={i18n`error-heading`} />;
    }
    return <FormattedMessage id={i18n`loading-heading`} />;
  };

  handleProgressComplete = () => {
    this.setState({
      isReady: true,
    });
  };

  render() {
    const { productLogo, progress, status } = this.props;

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
            <Button
              id="xflow-loading-go-to-product-button"
              isDisabled={!(isReady && status === 'ACTIVE')}
              onClick={this.handleGoToProductClick}
              appearance="primary"
            >
              <FormattedMessage id={i18n`go-to-product-button`} />
            </Button>
            <Button
              id="xflow-loading-close-button"
              onClick={this.handleCloseClick} appearance="subtle-link"
            >
              <FormattedMessage id={i18n`close-button`} />
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
                // TODO replace with proper way of serving SVGs for AtlasKit
                src="https://aes-artifacts--cdn.us-east-1.prod.public.atl-paas.net/hashed/lmp9uitENIE2uALwP2L-0RptjRxiiDMe0atv8gRXyCs/loading_img.svg"
                alt="app-switcher"
              />
            </WhereToFindConfluenceSVGDiv>
            <WhereToFindConfluenceDiv>
              <h5>
                <FormattedMessage id={i18n`info-heading`} />
              </h5>
              <WhereToFindConfluenceText>
                <FormattedMessage id={i18n`info-text`} />
              </WhereToFindConfluenceText>
            </WhereToFindConfluenceDiv>
          </LoadingTimeTextDiv>
        </StartTrialDialog>
      </ModalDialog>
    );
  }
}

export default withAnalytics(
  withXFlowProvider(
    LoadingTimeBase,
    ({
      xFlow: { config: { productLogo }, goToProduct, closeLoadingDialog, progress, status },
    }) => ({
      productLogo,
      progress,
      status,
      goToProduct,
      closeLoadingDialog,
    })
  )
);
